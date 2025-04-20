
import { getNextInvoiceNumber } from "@/components/dashboard/CurrencyUtils";

interface HandlersProps {
  setInvoiceNumber: (value: string) => void;
  setInvoiceNumberError: (value: string) => void;
  setCompanyInfo: (fn: (prev: any) => any) => void;
  setClientInfo: (fn: (prev: any) => any) => void;
}

export const useInvoiceHandlers = ({
  setInvoiceNumber,
  setInvoiceNumberError,
  setCompanyInfo,
  setClientInfo
}: HandlersProps) => {
  // Generate a unique invoice number
  const generateUniqueInvoiceNumber = () => {
    const newInvoiceNumber = getNextInvoiceNumber();
    setInvoiceNumber(newInvoiceNumber);
    setInvoiceNumberError("");
  };
  
  // Handle company info changes
  const handleCompanyInfoChange = (field: string, value: string | null) => {
    setCompanyInfo((prev: any) => ({ ...prev, [field]: value }));
  };
  
  // Handle client info changes
  const handleClientInfoChange = (field: string, value: string) => {
    setClientInfo((prev: any) => ({ ...prev, [field]: value }));
  };

  return {
    generateUniqueInvoiceNumber,
    handleCompanyInfoChange,
    handleClientInfoChange
  };
};
