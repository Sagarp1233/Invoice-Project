import { useState, useEffect, useRef } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useToast } from "@/hooks/use-toast";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import SummaryCards from "@/components/dashboard/SummaryCards";
import RecentInvoices from "@/components/dashboard/RecentInvoices";
import RevenueOverview from "@/components/dashboard/RevenueOverview";
import { formatCurrency } from "@/components/dashboard/CurrencyUtils";
import { useInvoiceCurrency } from "@/hooks/invoice/useInvoiceCurrency";
import { supabase } from "@/lib/supabase";
import { v4 as uuidv4 } from "uuid";
import html2pdf from "html2pdf.js";
import { markInvoiceAsPaid } from "@/actions/invoiceActions";

const getStatus = (invoice) => {
  const today = new Date();
  const dueRaw = invoice.dueDate || invoice.duedate;
  const due = dueRaw ? new Date(dueRaw) : null;

  if (invoice.status === "cancelled") return "cancelled";
  if (invoice.status === "draft") return "draft";
  if (invoice.is_paid) return "paid";
  if (due && due < today) return "overdue";
  return "pending";
};

const Dashboard = () => {
  const [userName, setUserName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [currency, setCurrency] = useState("INR");
  const [savedInvoices, setSavedInvoices] = useState([]);
  const [timeframe, setTimeframe] = useState(6);
  const { toast } = useToast();
  const invoiceRef = useRef(null);

  useInvoiceCurrency({ clientCountry: "", setCurrency });

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error || !session?.user) throw new Error("User not authenticated");

        const user = session.user;
        setUserName(user.user_metadata?.name || user.email || "User");

        const { data: invoices, error: invoicesError } = await supabase
          .from("invoices")
          .select("*, clientinfo")
          .eq("user_id", user.id);

        if (invoicesError) throw invoicesError;
        setSavedInvoices(invoices);
      } catch (err) {
        console.error("Invoice fetch error:", err);
        toast({ title: "Error", description: "Failed to load invoices.", variant: "destructive" });
        setSavedInvoices([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [toast]);

  const today = new Date();
  const isSameDay = (date1, date2) =>
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear();

  const pendingInvoices = savedInvoices.filter(inv => getStatus(inv) === "pending");
  const overdueInvoices = savedInvoices.filter(inv => getStatus(inv) === "overdue");
  const dueTodayInvoices = savedInvoices.filter(inv => {
    const dueDate = new Date(inv.dueDate || inv.duedate);
    return getStatus(inv) === "pending" && isSameDay(dueDate, today);
  });

  const sortedInvoices = [...savedInvoices].sort((a, b) => {
    const dateA = new Date(a.dueDate || a.duedate);
    const dateB = new Date(b.dueDate || b.duedate);
    return dateA.getTime() - dateB.getTime();
  });

  const totalRevenue = savedInvoices.reduce((sum, inv) => sum + Number(inv.total || 0), 0);
  const pendingAmount = pendingInvoices.reduce((sum, inv) => sum + Number(inv.total || 0), 0);
  const overdueAmount = overdueInvoices.reduce((sum, inv) => sum + Number(inv.total || 0), 0);

  const handleDeleteInvoice = async (id) => {
    try {
      const { error } = await supabase.from("invoices").delete().eq("id", id);
      if (error) throw error;
      setSavedInvoices(prev => prev.filter(inv => inv.id !== id));
      toast({ description: "Invoice deleted successfully." });
    } catch {
      toast({ description: "Failed to delete invoice", variant: "destructive" });
    }
  };

  const handleMarkAsPaid = async (invoiceId: string, paidDate: Date) => {
    try {
      await markInvoiceAsPaid(invoiceId, paidDate);

      setSavedInvoices(prev =>
        prev.map(inv =>
          inv.id === invoiceId
            ? { ...inv, is_paid: true, paid_date: paidDate.toISOString(), status: "paid" }
            : inv
        )
      );

      toast({ description: "Invoice marked as paid." });
    } catch (err) {
      console.error(err);
      toast({ title: "Error", description: "Failed to mark invoice as paid.", variant: "destructive" });
    }
  };

  const getNextSequentialInvoiceNumber = () => {
    const invoiceNumbers = savedInvoices
      .map(inv => inv.invoicenumber)
      .filter(num => /^INV-\d+$/.test(num))
      .map(num => parseInt(num.replace("INV-", ""), 10));

    const maxNumber = invoiceNumbers.length > 0 ? Math.max(...invoiceNumbers) : 0;
    return `INV-${(maxNumber + 1).toString().padStart(3, "0")}`;
  };

  const handleDuplicateInvoice = async (id) => {
    const original = savedInvoices.find(inv => inv.id === id);
    if (!original) return;

    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error || !session?.user) throw new Error("Session error");

      const newInvoiceNumber = getNextSequentialInvoiceNumber();

      const newInvoice = {
        id: uuidv4(),
        user_id: session.user.id,
        invoicenumber: newInvoiceNumber,
        clientinfo: original.clientinfo || null,
        items: original.items || [],
        status: original.status || "pending",
        total: original.total || 0,
        createdat: new Date().toISOString(),
        duedate: new Date().toISOString(),
        currency: original.currency || "INR",
      };

      const { data, error: insertError } = await supabase
        .from("invoices")
        .insert([newInvoice]);

      if (insertError) throw insertError;

      setSavedInvoices(prev => [...prev, ...data]);
      toast({ description: `Invoice duplicated as ${newInvoiceNumber}` });
    } catch (err) {
      console.error("Duplicate Error:", err.message);
      toast({ description: "Failed to duplicate invoice", variant: "destructive" });
    }
  };

  const handleDownloadInvoice = (invoice) => {
    if (!invoiceRef.current) return;

    invoiceRef.current.innerHTML = `
      <div style="padding: 24px; font-family: sans-serif;">
        <h2>Invoice: ${invoice.invoicenumber}</h2>
        <p><strong>Date:</strong> ${invoice.createdat?.slice(0, 10)}</p>
        <p><strong>Client:</strong> ${invoice.clientinfo?.name || 'N/A'}</p>
        <p><strong>Total:</strong> ₹${invoice.total}</p>
      </div>
    `;

    html2pdf().from(invoiceRef.current).save(`${invoice.invoicenumber}.pdf`);
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <DashboardHeader
          userName={userName}
          isLoading={isLoading}
          savedInvoices={savedInvoices}
          currency={currency}
          handleCurrencyChange={setCurrency}
        />
      </div>

      <div className="mb-6">
        <SummaryCards
          totalRevenue={totalRevenue}
          pendingAmount={pendingAmount}
          overdueAmount={overdueAmount}
          savedInvoices={savedInvoices}
          pendingInvoices={pendingInvoices}
          overdueInvoices={overdueInvoices}
          formatCurrency={(amount) => formatCurrency(amount, currency)}
          currency={currency}
        />
      </div>

      <div className="mb-6">
        <RecentInvoices
          savedInvoices={sortedInvoices}
          formatCurrency={(amount) => formatCurrency(amount, currency)}
          onDeleteInvoice={handleDeleteInvoice}
          onDuplicateInvoice={handleDuplicateInvoice}
          onDownloadInvoice={handleDownloadInvoice}
          onMarkAsPaid={handleMarkAsPaid}
          dueTodayInvoices={dueTodayInvoices}
          overdueInvoices={overdueInvoices}
          pendingInvoices={pendingInvoices}
        />
      </div>

      <RevenueOverview
        savedInvoices={savedInvoices}
        currency={currency}
        timeframe={timeframe}
        setTimeframe={setTimeframe}
      />

      <div className="hidden">
        <div id="invoice-download-preview" ref={invoiceRef}></div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;