
import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Mails } from "lucide-react";
import { useInvoiceBulkSend } from "@/components/invoice/actions/useInvoiceBulkSend";

interface SavedInvoice {
  id: string;
  invoiceNumber: string;
  clientInfo: {
    name: string;
    email: string;
  };
}

interface BulkSendModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedInvoices: SavedInvoice[];
  onReset: () => void;
}

export default function BulkSendModal({ 
  isOpen, 
  onClose, 
  selectedInvoices,
  onReset
}: BulkSendModalProps) {
  const { handleBulkSend, isSending, progress } = useInvoiceBulkSend({
    selectedInvoices,
    onComplete: () => {
      setTimeout(() => {
        onClose();
        onReset();
      }, 1500);
    }
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mails className="h-5 w-5 text-invoice-purple" />
            Send Multiple Invoices
          </DialogTitle>
          <DialogDescription>
            You are about to send {selectedInvoices.length} invoice{selectedInvoices.length !== 1 ? 's' : ''} to the respective clients.
          </DialogDescription>
        </DialogHeader>
        
        {selectedInvoices.length > 0 && (
          <div className="max-h-60 overflow-y-auto my-4">
            <ul className="space-y-2">
              {selectedInvoices.map((invoice) => (
                <li key={invoice.id} className="p-2 border rounded flex justify-between items-center">
                  <div>
                    <p className="font-medium">{invoice.invoiceNumber}</p>
                    <p className="text-sm text-muted-foreground">{invoice.clientInfo.name}</p>
                  </div>
                  <span className="text-sm">{invoice.clientInfo.email}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {isSending && (
          <div className="my-4 space-y-2">
            <p className="text-sm text-muted-foreground">Sending invoices... {progress}%</p>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        <DialogFooter className="flex gap-2 sm:gap-0">
          <Button 
            variant="outline" 
            onClick={onClose}
            disabled={isSending}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleBulkSend}
            className="bg-invoice-purple hover:bg-invoice-darkPurple"
            disabled={isSending || selectedInvoices.length === 0}
          >
            {isSending ? 'Sending...' : 'Send Invoices'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
