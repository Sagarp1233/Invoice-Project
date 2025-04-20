
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface BulkSendProps {
  selectedInvoices: {
    id: string;
    invoiceNumber: string;
    clientInfo: {
      name: string;
      email: string;
    };
  }[];
  onComplete: () => void;
}

export const useInvoiceBulkSend = ({ selectedInvoices, onComplete }: BulkSendProps) => {
  const { toast } = useToast();
  const [isSending, setIsSending] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const handleBulkSend = async () => {
    if (selectedInvoices.length === 0) {
      toast({
        title: "No invoices selected",
        description: "Please select at least one invoice to send",
        variant: "destructive",
      });
      return;
    }
    
    setIsSending(true);
    setProgress(0);
    
    // In a real application, we would call an API endpoint to send the invoices
    // For demonstration, we'll simulate the sending process
    const totalInvoices = selectedInvoices.length;
    let successCount = 0;
    
    for (let i = 0; i < totalInvoices; i++) {
      const invoice = selectedInvoices[i];
      
      // Simulate API call with a delay
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          // Simulate success for all invoices for demo purposes
          successCount++;
          setProgress(Math.round(((i + 1) / totalInvoices) * 100));
          resolve();
        }, 500); // Half second delay per invoice to simulate sending
      });
    }
    
    setIsSending(false);
    
    toast({
      title: "Invoices Sent",
      description: `Successfully sent ${successCount} out of ${totalInvoices} invoices.`,
    });
    
    onComplete();
  };

  return { handleBulkSend, isSending, progress };
};
