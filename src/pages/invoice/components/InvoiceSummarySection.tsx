
import React from 'react';
import InvoiceSummary from "@/components/invoice/InvoiceSummary";

interface InvoiceSummarySectionProps {
  invoiceNumber: string;
  issueDate: Date;
  dueDate: Date;
  clientInfo: any;
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  total: number;
  templateId: string | null;
  currency: string;
}

const InvoiceSummarySection: React.FC<InvoiceSummarySectionProps> = ({
  invoiceNumber,
  issueDate,
  dueDate,
  clientInfo,
  subtotal,
  taxRate,
  taxAmount,
  total,
  templateId,
  currency
}) => {
  return (
    <div className="space-y-6">
      <InvoiceSummary 
        invoiceNumber={invoiceNumber}
        issueDate={issueDate}
        dueDate={dueDate}
        clientInfo={clientInfo}
        subtotal={subtotal}
        taxRate={taxRate}
        taxAmount={taxAmount}
        total={total}
        templateId={templateId}
        currency={currency}
      />
    </div>
  );
};

export default InvoiceSummarySection;
