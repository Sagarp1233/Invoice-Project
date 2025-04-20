
import { useInvoiceSave } from "./useInvoiceSave";
import { useInvoicePreview } from "./useInvoicePreview";
import { useInvoiceDownload } from "./useInvoiceDownload";
import { useInvoicePrint } from "./useInvoicePrint";
import { useInvoiceSend } from "./useInvoiceSend";

interface InvoiceData {
  invoiceNumber: string;
  issueDate: Date;
  dueDate: Date;
  companyInfo: any;
  clientInfo: any;
  items: any[];
  taxRate: number;
  notes: string;
  subtotal: number;
  taxAmount: number;
  total: number;
  template: string;
  currency?: string;
}

export const useInvoiceActions = (
  invoiceRef: React.RefObject<HTMLDivElement>,
  isEditMode: boolean,
  editInvoiceId: string | null,
  invoiceData: InvoiceData,
  setPreviewModalOpen: (open: boolean) => void,
  invoiceNumberError: string
) => {
  // Get individual action handlers
  const { handleSaveInvoice } = useInvoiceSave({
    isEditMode,
    editInvoiceId,
    invoiceData,
    invoiceNumberError
  });
  
  const { handlePreviewInvoice } = useInvoicePreview({
    setPreviewModalOpen
  });
  
  const { handleDownloadInvoice } = useInvoiceDownload({
    invoiceRef,
    setPreviewModalOpen,
    invoiceData
  });
  
  const { handlePrintInvoice } = useInvoicePrint({
    invoiceData
  });
  
  const { handleSendInvoice } = useInvoiceSend({
    invoiceData,
    setPreviewModalOpen,
    invoiceNumberError
  });

  return {
    handleSaveInvoice,
    handlePreviewInvoice,
    handleDownloadInvoice,
    handlePrintInvoice,
    handleSendInvoice
  };
};
