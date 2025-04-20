import { useMemo } from "react";
import { InvoiceItem } from "./useInvoiceItems";

interface CalculationProps {
  invoiceItems: InvoiceItem[];
  taxRate: number;
  directAmount: number | null;
}

export const useInvoiceCalculations = ({ 
  invoiceItems, 
  taxRate, 
  directAmount 
}: CalculationProps) => {
  // Ensure taxRate is a number
  const rate = typeof taxRate === "string" ? parseFloat(taxRate) : taxRate || 0;

  // Calculate totals using useMemo to improve performance
  const { subtotal, taxAmount, total } = useMemo(() => {
    if (directAmount !== null) {
      const calculatedTaxAmount = directAmount * (rate / 100);
      return {
        subtotal: directAmount,
        taxAmount: calculatedTaxAmount,
        total: directAmount + calculatedTaxAmount
      };
    } else {
      const calculatedSubtotal = invoiceItems.reduce(
        (sum, item) => sum + (item.price * item.quantity),
        0
      );
      const calculatedTaxAmount = calculatedSubtotal * (rate / 100);
      return {
        subtotal: calculatedSubtotal,
        taxAmount: calculatedTaxAmount,
        total: calculatedSubtotal + calculatedTaxAmount
      };
    }
  }, [invoiceItems, rate, directAmount]);

  return {
    subtotal,
    taxAmount,
    total
  };
};
