
import { useEffect } from "react";

interface ValidationProps {
  invoiceNumber: string;
  isEditMode: boolean;
  setInvoiceNumberError: (error: string) => void;
}

export const useInvoiceValidation = ({ 
  invoiceNumber, 
  isEditMode, 
  setInvoiceNumberError 
}: ValidationProps) => {
  // Check for invoice number uniqueness (only in create mode)
  useEffect(() => {
    if (!isEditMode && invoiceNumber && invoiceNumber.trim() !== "") {
      // Check if this invoice number already exists in saved invoices
      const savedInvoices = JSON.parse(localStorage.getItem('invoices') || '[]');
      const isDuplicate = savedInvoices.some(
        (invoice: any) => invoice.invoiceNumber === invoiceNumber
      );
      
      if (isDuplicate) {
        setInvoiceNumberError("This invoice number already exists. Please use a unique number.");
      } else {
        setInvoiceNumberError("");
      }
    } else {
      setInvoiceNumberError("");
    }
  }, [invoiceNumber, isEditMode, setInvoiceNumberError]);
};
