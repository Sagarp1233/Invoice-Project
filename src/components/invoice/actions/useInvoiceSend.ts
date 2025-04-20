import { useToast } from "@/hooks/use-toast";
import { useAccessControl } from "@/hooks/useAccessControl";

interface SendProps {
  invoiceData: {
    invoiceNumber: string;
    issueDate: Date;
    dueDate: Date;
    companyInfo: Record<string, any>;
    clientInfo: {
      email: string;
      name?: string;
    };
    items: any[];
    taxRate: number;
    notes: string;
    subtotal: number;
    taxAmount: number;
    total: number;
    template: string;
    currency?: string;
  };
  setPreviewModalOpen: (open: boolean) => void;
  invoiceNumberError: string;
}

export const useInvoiceSend = ({
  invoiceData,
  setPreviewModalOpen,
  invoiceNumberError
}: SendProps) => {
  const { toast } = useToast();
  const { canSendInvoice } = useAccessControl(); // 🔒 Check if user is Pro

  const handleSendInvoice = async () => {
    try {
      // 🔒 Restrict Free users
      if (!canSendInvoice) {
        toast({
          title: "Upgrade to Pro",
          description: "Sending invoices is available only on the Pro plan. Please upgrade to unlock this feature.",
          variant: "destructive",
        });
        return;
      }

      // ⚠️ Validate invoice number
      if (invoiceNumberError) {
        toast({
          title: "Validation Error",
          description: invoiceNumberError,
          variant: "destructive",
        });
        return;
      }

      // ✅ Sanitize invoice data before sending
      const sanitizedInvoice = {
        invoiceNumber: invoiceData.invoiceNumber,
        issueDate: invoiceData.issueDate,
        dueDate: invoiceData.dueDate,
        companyInfo: { ...invoiceData.companyInfo },
        clientInfo: { ...invoiceData.clientInfo },
        items: invoiceData.items.map(item => ({ ...item })),
        taxRate: invoiceData.taxRate,
        notes: invoiceData.notes,
        subtotal: invoiceData.subtotal,
        taxAmount: invoiceData.taxAmount,
        total: invoiceData.total,
        template: invoiceData.template,
        currency: invoiceData.currency,
      };

      // ✅ Send email using Express backend API
      const response = await fetch("http://localhost:4000/api/send-invoice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          invoiceData: sanitizedInvoice,
          recipientEmail: sanitizedInvoice.clientInfo.email,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send invoice email.");
      }

      toast({
        title: "Invoice Sent",
        description: `Email with invoice has been sent to ${invoiceData.clientInfo.email}.`,
      });

      setPreviewModalOpen(false);
    } catch (error: any) {
      toast({
        title: "Sending Failed",
        description: error.message || "An unexpected error occurred.",
        variant: "destructive"
      });
    }
  };

  return { handleSendInvoice };
};
