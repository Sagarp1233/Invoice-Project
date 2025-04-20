
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save, Eye, Printer, FileDown, Send } from "lucide-react";

interface InvoiceHeaderProps {
  isEditMode: boolean;
  invoiceNumberError: string;
  onBack: () => void;
  onSave: () => void;
  onPreview: () => void;
  onPrint: () => void;
  onDownload: () => void;
  onSend: () => void;
}

const InvoiceHeader = ({
  isEditMode,
  invoiceNumberError,
  onBack,
  onSave,
  onPreview,
  onPrint,
  onDownload,
  onSend,
}: InvoiceHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 invoice-header">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl sm:text-3xl font-bold">
          {isEditMode ? "Edit Invoice" : "Create Invoice"}
        </h1>
      </div>
      <div className="flex flex-wrap gap-2 invoice-actions">
        <Button 
          variant="outline" 
          onClick={onSave}
          disabled={!!invoiceNumberError}
          className="w-full sm:w-auto"
        >
          <Save className="mr-2 h-4 w-4" /> {isEditMode ? "Update" : "Save"}
        </Button>
        <Button 
          variant="outline" 
          onClick={onPreview}
          className="w-full sm:w-auto"
        >
          <Eye className="mr-2 h-4 w-4" /> Preview
        </Button>
        <Button 
          variant="outline" 
          onClick={onPrint}
          className="w-full sm:w-auto"
        >
          <Printer className="mr-2 h-4 w-4" /> Print
        </Button>
        <Button 
          variant="outline" 
          onClick={onDownload}
          className="w-full sm:w-auto"
        >
          <FileDown className="mr-2 h-4 w-4" /> Download
        </Button>
        <Button 
          className="bg-invoice-purple hover:bg-invoice-darkPurple w-full sm:w-auto" 
          onClick={onSend}
          disabled={!!invoiceNumberError}
        >
          <Send className="mr-2 h-4 w-4" /> Send
        </Button>
      </div>
    </div>
  );
};

export default InvoiceHeader;
