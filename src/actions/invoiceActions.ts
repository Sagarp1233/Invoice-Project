import { supabase } from "@/lib/supabase";

export const markInvoiceAsPaid = async (invoiceId: string, paidDate: Date) => {
  if (!paidDate) {
    throw new Error("No paidDate passed");
  }

  const { data, error } = await supabase
    .from("invoices")
    .update({
      is_paid: true,
      paid_date: paidDate.toISOString(), // ✅ only if date exists
      status: "paid"
    })
    .eq("id", invoiceId);

  if (error) {
    console.error("❌ Supabase update error:", error);
    throw new Error("Failed to mark invoice as paid");
  }

  return data;
};
