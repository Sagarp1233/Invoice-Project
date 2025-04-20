
import { useEffect } from "react";
import { getNextInvoiceNumber } from "@/components/dashboard/CurrencyUtils";

interface InitProps {
  isEditMode: boolean;
  setInvoiceNumber: (value: string) => void;
}

export const useInvoiceInitialization = ({ isEditMode, setInvoiceNumber }: InitProps) => {
  // Initialize invoice number when component mounts (only for new invoices)
  useEffect(() => {
    if (!isEditMode) {
      setInvoiceNumber(getNextInvoiceNumber());
    }
  }, [isEditMode, setInvoiceNumber]);
};
