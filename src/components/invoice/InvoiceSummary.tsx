import { format, isValid } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { currencySymbols } from "@/components/dashboard/CurrencyUtils";

interface InvoiceSummaryProps {
  invoiceNumber: string;
  issueDate: Date;
  dueDate: Date;
  clientInfo: {
    name: string;
    country?: string;
    type?: string;
  };
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  total: number;
  templateId?: string | null;
  currency?: string;
}

const InvoiceSummary = ({
  invoiceNumber,
  issueDate,
  dueDate,
  clientInfo,
  subtotal,
  taxRate,
  taxAmount,
  total,
  templateId,
  currency = 'USD'
}: InvoiceSummaryProps) => {
  const navigate = useNavigate();

  const formatAmount = (amount: number): string => {
    const symbol = currencySymbols[currency as keyof typeof currencySymbols] || '$';
    return `${symbol}${amount.toFixed(2)}`;
  };

  const formatClientType = (type?: string): string => {
    if (!type) return '';
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <h3 className="font-medium mb-4">Invoice Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Invoice Number:</span>
              <span>{invoiceNumber}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Issue Date:</span>
              <span>{isValid(issueDate) ? format(issueDate, "MMM d, yyyy") : "—"}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Due Date:</span>
              <span>{isValid(dueDate) ? format(dueDate, "MMM d, yyyy") : "—"}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Client:</span>
              <span>{clientInfo.name}</span>
            </div>
            {clientInfo.type && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Client Type:</span>
                <span>{formatClientType(clientInfo.type)}</span>
              </div>
            )}
            <div className="border-t my-2 pt-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal:</span>
                <span>{formatAmount(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax ({taxRate}%):</span>
                <span>{formatAmount(taxAmount)}</span>
              </div>
              <div className="flex justify-between font-medium text-lg mt-2 pt-2 border-t">
                <span>Total:</span>
                <span>{formatAmount(total)}</span>
              </div>
              <div className="flex justify-end mt-1">
                <span className="text-xs text-muted-foreground">
                  {currency !== 'USD' ? `(All amounts in ${currency})` : ''}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h3 className="font-medium mb-4">Selected Template</h3>
          {templateId ? (
            <div className="text-center">
              <div className="border rounded-lg overflow-hidden mb-3">
                <img
                  src={`https://assets.bootstrapbuildspace.com/imgbag/1/64fa8e00d2fa90eec80a1f0${parseInt(templateId.slice(-1)) % 6}.png`}
                  alt="Selected Template"
                  className="w-full h-auto"
                />
              </div>
              <p className="text-sm">
                Using{" "}
                <span className="font-medium">
                  {templateId === "template1" ? "Professional" :
                    templateId === "template2" ? "Minimalist" :
                      templateId === "template3" ? "Classic" :
                        templateId === "template4" ? "Modern" :
                          templateId === "template5" ? "Creative" : "Corporate"}
                </span>{" "}template
              </p>
              <Button
                variant="link"
                className="mt-2 text-invoice-purple"
                onClick={() => navigate("/invoice-templates")}
              >
                Change Template
              </Button>
            </div>
          ) : (
            <div className="text-center p-4">
              <p className="text-muted-foreground mb-2">No template selected</p>
              <Button
                variant="outline"
                onClick={() => navigate("/invoice-templates")}
              >
                Choose a Template
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default InvoiceSummary;
