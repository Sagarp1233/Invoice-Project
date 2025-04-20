import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

interface InvoiceData {
  invoiceNumber: string;
  dueDate: string;
  clientInfo: {
    name?: string;
    [key: string]: any;
  };
  items: any[];
  total: number;
  status?: string;
  currency: string;
}

interface SaveProps {
  isEditMode: boolean;
  editInvoiceId: string | null;
  invoiceData: InvoiceData;
  invoiceNumberError: string;
  selectedCurrency: string;
  exchangeRate: number;
}

export const useInvoiceSave = ({ 
  isEditMode, 
  editInvoiceId, 
  invoiceData, 
  invoiceNumberError,
  selectedCurrency,
  exchangeRate
}: SaveProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSaveInvoice = async () => {
    if (!isEditMode && invoiceNumberError) {
      toast({
        title: "Validation Error",
        description: invoiceNumberError,
        variant: "destructive",
      });
      return;
    }

    try {
      const {
        data: { session },
        error: sessionError
      } = await supabase.auth.getSession();

      if (sessionError || !session?.user) {
        throw new Error("User not authenticated");
      }

      const user = session.user;

      const originalAmount = Number(invoiceData.total);
      const finalAmount = originalAmount; // Store as-is, without applying exchange rate

      const payload = {
        invoicenumber: invoiceData.invoiceNumber || "INV-000",
        clientinfo: {
          ...invoiceData.clientInfo,
          name: invoiceData.clientInfo?.name || "Unnamed Client"
        },
        items: invoiceData.items,
        total: finalAmount,
        status: invoiceData.status || "Draft",
        duedate: invoiceData.dueDate,
        user_id: user.id,
        currency: selectedCurrency || "INR",
      };

      if (isEditMode && editInvoiceId) {
        const { error: updateError } = await supabase
          .from("invoices")
          .update(payload)
          .eq("id", editInvoiceId)
          .eq("user_id", user.id);

        if (updateError) throw updateError;

        toast({
          title: "Invoice Updated",
          description: "Your invoice has been updated successfully.",
        });
      } else {
        const { error: insertError } = await supabase
          .from("invoices")
          .insert([payload]);

        if (insertError) throw insertError;

        toast({
          title: "Invoice Saved",
          description: "Your invoice has been saved successfully.",
        });
      }

      navigate("/dashboard");
    } catch (error) {
      console.error("Save error:", error);
      toast({
        title: "Error",
        description: "There was a problem saving your invoice.",
        variant: "destructive",
      });
    }
  };

  return { handleSaveInvoice };
};
