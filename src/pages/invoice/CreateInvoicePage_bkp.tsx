// Final working CreateInvoicePage.tsx
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import InvoiceItemsForm from "@/components/invoice/InvoiceItemsForm";
import { useUserSettings } from "@/components/settings/useUserSettings";
import { getInvoiceById } from "@/lib/invoiceService";

const CreateInvoicePage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const editId = searchParams.get("edit");

  const { userSettings } = useUserSettings();
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvoice = async () => {
      if (editId) {
        const data = await getInvoiceById(editId);
        setInvoice(data);
      } else {
        setInvoice({
          invoiceNumber: "",
          issueDate: new Date().toISOString().split("T")[0],
          dueDate: "",
          clientName: "",
          clientType: "Business",
          email: "",
          address: "",
          items: [
            {
              id: Date.now().toString(),
              description: "",
              quantity: 1,
              price: 0,
              total: 0,
            },
          ],
          taxRate: userSettings.defaultTaxRate,
          notes: "",
          directAmount: null,
        });
      }
      setLoading(false);
    };
    fetchInvoice();
  }, [editId]);

  useEffect(() => {
    if (!invoice) return;

    if (!invoice.taxRate || invoice.taxRate === 0) {
      setInvoice((prev) => ({
        ...prev,
        taxRate: userSettings.defaultTaxRate,
      }));
    }

    if (!invoice.dueDate && invoice.issueDate) {
      const issue = new Date(invoice.issueDate);
      const due = new Date(issue);
      due.setDate(due.getDate() + userSettings.defaultPaymentTerms);
      setInvoice((prev) => ({
        ...prev,
        dueDate: due.toISOString().split("T")[0],
      }));
    }
  }, [invoice?.issueDate, userSettings]);

  if (loading || !invoice) return <div>Loading...</div>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-xl font-bold mb-4">Create Invoice</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Invoice Number</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={invoice.invoiceNumber}
            onChange={(e) => setInvoice({ ...invoice, invoiceNumber: e.target.value })}
          />
        </div>
        <div>
          <label className="text-sm font-medium">Client Name</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={invoice.clientName}
            onChange={(e) => setInvoice({ ...invoice, clientName: e.target.value })}
          />
        </div>
        <div>
          <label className="text-sm font-medium">Email</label>
          <input
            type="email"
            className="w-full border rounded px-3 py-2"
            value={invoice.email}
            onChange={(e) => setInvoice({ ...invoice, email: e.target.value })}
          />
        </div>
        <div>
          <label className="text-sm font-medium">Address</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={invoice.address}
            onChange={(e) => setInvoice({ ...invoice, address: e.target.value })}
          />
        </div>
        <div>
          <label className="text-sm font-medium">Issue Date</label>
          <input
            type="date"
            className="w-full border rounded px-3 py-2"
            value={invoice.issueDate}
            onChange={(e) => setInvoice({ ...invoice, issueDate: e.target.value })}
          />
        </div>
        <div>
          <label className="text-sm font-medium">Due Date</label>
          <input
            type="date"
            className="w-full border rounded px-3 py-2"
            value={invoice.dueDate}
            onChange={(e) => setInvoice({ ...invoice, dueDate: e.target.value })}
          />
        </div>
      </div>

      <InvoiceItemsForm
        items={invoice.items}
        onChange={(items) => {
          console.log("📥 Items received from form:", items);
          setInvoice((prev) => ({
            ...prev,
            items,
          }));
        }}
        taxRate={invoice.taxRate}
        onTaxRateChange={(rate) =>
          setInvoice((prev) => ({ ...prev, taxRate: rate }))
        }
        directAmount={invoice.directAmount}
        onDirectAmountChange={(amt) =>
          setInvoice((prev) => ({ ...prev, directAmount: amt }))
        }
        notes={invoice.notes}
        onNotesChange={(notes) =>
          setInvoice((prev) => ({ ...prev, notes }))
        }
        currency="INR"
      />
    </div>
  );
};

export default CreateInvoicePage;