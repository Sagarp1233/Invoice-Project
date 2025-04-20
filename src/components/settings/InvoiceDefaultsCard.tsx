import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface InvoiceDefaultsProps {
  defaultPaymentTerms: number;
  defaultTaxRate: number;
  onSettingChange: (field: string, value: any) => void;
  onSave: () => void;
}

const InvoiceDefaultsCard: React.FC<InvoiceDefaultsProps> = ({
  defaultPaymentTerms,
  defaultTaxRate,
  onSettingChange,
  onSave,
}) => {
  const paymentOptions = [7, 15, 30, 60];
  const taxRateOptions = [0, 5, 10, 18];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Invoice Defaults</CardTitle>
        <CardDescription>
          Set default values for new invoices
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4">
          {/* Payment Terms */}
          <div className="space-y-2">
            <Label>Default Payment Terms</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {paymentOptions.map((term) => (
                <Button
                  key={term}
                  variant="outline"
                  className={
                    term === defaultPaymentTerms
                      ? "bg-invoice-purple text-white hover:bg-invoice-darkPurple"
                      : ""
                  }
                  onClick={() => onSettingChange("defaultPaymentTerms", term)}
                >
                  {term === defaultPaymentTerms && (
                    <Check className="mr-2 h-4 w-4" />
                  )}
                  {term} days
                </Button>
              ))}
            </div>
          </div>

          {/* Tax Rate */}
          <div className="space-y-2">
            <Label>Default Tax Rate</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {taxRateOptions.map((rate) => (
                <Button
                  key={rate}
                  variant="outline"
                  className={
                    rate === defaultTaxRate
                      ? "bg-invoice-purple text-white hover:bg-invoice-darkPurple"
                      : ""
                  }
                  onClick={() => onSettingChange("defaultTaxRate", rate)}
                >
                  {rate === defaultTaxRate && (
                    <Check className="mr-2 h-4 w-4" />
                  )}
                  {rate}%
                </Button>
              ))}
            </div>
          </div>
        </div>

        <Button
          onClick={onSave}
          className="bg-invoice-purple hover:bg-invoice-darkPurple"
        >
          Save Invoice Defaults
        </Button>
      </CardContent>
    </Card>
  );
};

export default InvoiceDefaultsCard;
