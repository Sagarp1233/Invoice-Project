import { useInvoiceItemsForm } from "./items/useInvoiceItemsForm";
import BillingTypeSelector from "./items/BillingTypeSelector";
import DirectAmountInput from "./items/DirectAmountInput";
import InvoiceItemsTable from "./items/InvoiceItemsTable";
import InvoiceTotalsSection from "./items/InvoiceTotalsSection";
import { InvoiceItem } from "../../hooks/invoice/useInvoiceItems";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface InvoiceItemsFormProps {
  items: InvoiceItem[];
  onChange: (items: InvoiceItem[]) => void;
  taxRate: number;
  onTaxRateChange: (rate: number) => void;
  directAmount: number | null;
  onDirectAmountChange: (amount: number | null) => void;
  notes: string;
  onNotesChange: (notes: string) => void;
  currency?: string;
}

const InvoiceItemsForm: React.FC<InvoiceItemsFormProps> = ({
  items,
  onChange,
  taxRate,
  onTaxRateChange,
  directAmount,
  onDirectAmountChange,
  notes,
  onNotesChange,
  currency
}) => {
  const {
    useDirectAmount,
    addItem,
    removeItem,
    updateItem,
    handleDirectAmountChange,
    toggleAmountType,
    subtotal,
    taxAmount,
    total
  } = useInvoiceItemsForm({
    items,
    onChange,
    taxRate: typeof taxRate === "string" ? parseFloat(taxRate) || 0 : taxRate,
    onTaxRateChange,
    directAmount,
    onDirectAmountChange
  });

  return (
    <div className="space-y-6">
      <BillingTypeSelector 
        useDirectAmount={useDirectAmount} 
        onToggle={toggleAmountType} 
      />

      {useDirectAmount ? (
        <DirectAmountInput 
          amount={directAmount} 
          onChange={handleDirectAmountChange} 
          currency={currency}
        />
      ) : (
        <InvoiceItemsTable
          items={items}
          onUpdateItem={updateItem}
          onRemoveItem={removeItem}
          onAddItem={addItem}
          currency={currency}
        />
      )}
      
      <InvoiceTotalsSection
        subtotal={subtotal}
        taxRate={taxRate}
        taxAmount={taxAmount}
        total={total}
        onTaxRateChange={(rate) => onTaxRateChange(parseFloat(rate.toString()) || 0)}
        currency={currency}
      />
      
      <div className="mt-6">
        <Label htmlFor="invoiceNotes">Notes</Label>
        <Textarea
          id="invoiceNotes"
          placeholder="Add any additional notes or payment instructions..."
          value={notes}
          onChange={(e) => onNotesChange(e.target.value)}
          className="mt-2"
          rows={4}
        />
      </div>
    </div>
  );
};

export default InvoiceItemsForm;