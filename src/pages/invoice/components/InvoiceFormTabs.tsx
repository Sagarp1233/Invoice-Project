
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InvoiceDetails from "@/components/invoice/InvoiceDetails";
import CompanyInfoForm from "@/components/invoice/CompanyInfoForm";
import InvoiceItemsForm from "@/components/invoice/InvoiceItemsForm";
import { InvoiceItem } from "@/hooks/useInvoice";

interface InvoiceFormTabsProps {
  invoiceNumber: string;
  invoiceNumberError: string;
  issueDate: Date;
  dueDate: Date;
  clientInfo: {
    name: string;
    email: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  companyInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    website: string;
    logo: any;
    logoUrl: string;
  };
  invoiceItems: InvoiceItem[];
  taxRate: number;
  directAmount: number | null;
  notes: string;
  onInvoiceNumberChange: (value: string) => void;
  onGenerateInvoiceNumber: () => void;
  onIssueDateChange: (date: Date | undefined) => void;
  onDueDateChange: (date: Date | undefined) => void;
  onClientInfoChange: (field: string, value: string) => void;
  onCompanyInfoChange: (field: string, value: string) => void;
  onInvoiceItemsChange: (items: InvoiceItem[]) => void;
  onTaxRateChange: (value: number) => void;
  onDirectAmountChange: (value: number | null) => void;
  onNotesChange: (value: string) => void;
  currency?: string;
}

const InvoiceFormTabs: React.FC<InvoiceFormTabsProps> = ({
  invoiceNumber,
  invoiceNumberError,
  issueDate,
  dueDate,
  clientInfo,
  companyInfo,
  invoiceItems,
  taxRate,
  directAmount,
  notes,
  onInvoiceNumberChange,
  onGenerateInvoiceNumber,
  onIssueDateChange,
  onDueDateChange,
  onClientInfoChange,
  onCompanyInfoChange,
  onInvoiceItemsChange,
  onTaxRateChange,
  onDirectAmountChange,
  onNotesChange,
  currency
}) => {
  return (
    <Tabs defaultValue="details" className="p-6">
      <TabsList className="grid grid-cols-3 w-full mb-6">
        <TabsTrigger value="details">Basic Info</TabsTrigger>
        <TabsTrigger value="company">Company Info</TabsTrigger>
        <TabsTrigger value="items">Invoice Items</TabsTrigger>
      </TabsList>
      
      <TabsContent value="details" className="space-y-6">
        <InvoiceDetails
          invoiceNumber={invoiceNumber}
          invoiceNumberError={invoiceNumberError}
          issueDate={issueDate}
          dueDate={dueDate}
          clientInfo={clientInfo}
          currency={currency}
          onInvoiceNumberChange={onInvoiceNumberChange}
          onGenerateInvoiceNumber={onGenerateInvoiceNumber}
          onIssueDateChange={onIssueDateChange}
          onDueDateChange={onDueDateChange}
          onClientInfoChange={onClientInfoChange}
        />
      </TabsContent>
      
      <TabsContent value="company" className="space-y-6">
        <CompanyInfoForm
          companyInfo={companyInfo}
          onChange={onCompanyInfoChange}
        />
      </TabsContent>
      
      <TabsContent value="items" className="space-y-6">
        <InvoiceItemsForm
          items={invoiceItems}
          taxRate={taxRate}
          directAmount={directAmount}
          notes={notes}
          onChange={onInvoiceItemsChange}
          onTaxRateChange={onTaxRateChange}
          onDirectAmountChange={onDirectAmountChange}
          onNotesChange={onNotesChange}
          currency={currency}
        />
      </TabsContent>
    </Tabs>
  );
};

export default InvoiceFormTabs;
