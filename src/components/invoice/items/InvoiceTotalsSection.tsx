import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface InvoiceTotalsSectionProps {
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  total: number;
  onTaxRateChange: (rate: number) => void;
  currency?: string;
}

const InvoiceTotalsSection: React.FC<InvoiceTotalsSectionProps> = ({
  subtotal,
  taxRate,
  taxAmount,
  total,
  onTaxRateChange,
  currency = "INR",
}) => {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 w-full">
      <div>
        <Label htmlFor="subtotal">Subtotal</Label>
        <Input id="subtotal" value={`${currency} ${subtotal.toFixed(2)}`} readOnly />
      </div>

      <div>
        <Label htmlFor="taxRate">Tax Rate (%)</Label>
        <Input
          id="taxRate"
          type="number"
          min={0}
          max={100}
          value={taxRate}
          onChange={(e) => onTaxRateChange(Number(e.target.value))}
        />
      </div>

      <div>
        <Label htmlFor="taxAmount">Tax Amount</Label>
        <Input id="taxAmount" value={`${currency} ${taxAmount.toFixed(2)}`} readOnly />
      </div>

      <div>
        <Label htmlFor="total">Total</Label>
        <Input id="total" value={`${currency} ${total.toFixed(2)}`} readOnly />
      </div>
    </div>
  );
};

export default InvoiceTotalsSection;
