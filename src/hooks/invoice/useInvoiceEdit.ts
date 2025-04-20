import { useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface EditProps {
  editInvoiceId: string | null;
  setIsEditMode: (value: boolean) => void;
  setInvoiceNumber: (value: string) => void;
  setIssueDate: (value: Date) => void;
  setDueDate: (value: Date) => void;
  setCompanyInfo: (value: any) => void;
  setClientInfo: (value: any) => void;
  setInvoiceItems: (value: any) => void;
  setTaxRate: (value: number) => void;
  setNotes: (value: string) => void;
  setTemplateId: (value: string | null) => void;
  setInvoiceCurrency: (value: string) => void;
}

export const useInvoiceEdit = ({
  editInvoiceId,
  setIsEditMode,
  setInvoiceNumber,
  setIssueDate,
  setDueDate,
  setCompanyInfo,
  setClientInfo,
  setInvoiceItems,
  setTaxRate,
  setNotes,
  setTemplateId,
  setInvoiceCurrency,
}: EditProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchInvoice = async () => {
      if (!editInvoiceId) return;

      const { data, error } = await supabase
        .from("invoices")
        .select("*")
        .eq("id", editInvoiceId)
        .single();

      if (error || !data) {
        toast({
          title: "Invoice Not Found",
          description: "The invoice you're trying to edit doesn't exist.",
          variant: "destructive",
        });
        navigate("/dashboard");
        return;
      }

      setIsEditMode(true);
      setInvoiceNumber(data.invoicenumber || "");

      try {
        const parsedIssueDate = data.issueDate || data.issuedate;
        const parsedDueDate = data.dueDate || data.duedate;

        const issue = parsedIssueDate ? new Date(parsedIssueDate) : new Date();
        let due = parsedDueDate ? new Date(parsedDueDate) : null;

        if (!due || isNaN(due.getTime())) {
          due = new Date(issue.getTime() + 30 * 24 * 60 * 60 * 1000);
        }

        if (due < issue) {
          due = new Date(issue.getTime() + 30 * 24 * 60 * 60 * 1000);
        }

        setIssueDate(issue);
        setDueDate(due);
      } catch {
        const now = new Date();
        setIssueDate(now);
        setDueDate(new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000));
      }

      setCompanyInfo(data.companyInfo || {});
      setClientInfo(data.clientInfo || {});
      setInvoiceItems(data.items || []);

      // ✅ Explicitly ensure taxRate doesn't get overwritten if it's already correct
      const taxRate = typeof data.taxRate === "number" ? data.taxRate : parseFloat(data.taxRate);
      if (!isNaN(taxRate)) {
        setTaxRate(taxRate);
      } else {
        setTaxRate(0);
      }

      setNotes(data.notes || "");
      setTemplateId(data.template !== "default" ? data.template : null);
      setInvoiceCurrency(data.currency || "INR");
    };

    fetchInvoice();
  }, [
    editInvoiceId,
    navigate,
    toast,
    setIsEditMode,
    setInvoiceNumber,
    setIssueDate,
    setDueDate,
    setCompanyInfo,
    setClientInfo,
    setInvoiceItems,
    setTaxRate,
    setNotes,
    setTemplateId,
    setInvoiceCurrency,
  ]);
};
