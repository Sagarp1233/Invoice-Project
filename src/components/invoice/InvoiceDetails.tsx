import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, AlertCircle } from "lucide-react";
import { format, isValid } from "date-fns"; // ✅ updated
import { cn } from "@/lib/utils";
import ClientInfoForm from "./ClientInfoForm";

interface InvoiceDetailsProps {
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
  currency?: string;
  onInvoiceNumberChange: (value: string) => void;
  onGenerateInvoiceNumber: () => void;
  onIssueDateChange: (date: Date | undefined) => void;
  onDueDateChange: (date: Date | undefined) => void;
  onClientInfoChange: (field: string, value: string) => void;
}

const InvoiceDetails = ({
  invoiceNumber,
  invoiceNumberError,
  issueDate,
  dueDate,
  clientInfo,
  currency,
  onInvoiceNumberChange,
  onGenerateInvoiceNumber,
  onIssueDateChange,
  onDueDateChange,
  onClientInfoChange
}: InvoiceDetailsProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="invoiceNumber">Invoice Number</Label>
          <div className="flex items-center gap-2">
            <Input
              id="invoiceNumber"
              value={invoiceNumber}
              onChange={(e) => onInvoiceNumberChange(e.target.value)}
              className={invoiceNumberError ? "border-red-500" : ""}
            />
            <Button
              variant="outline"
              size="icon"
              onClick={onGenerateInvoiceNumber}
              title="Generate unique invoice number"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-refresh-cw"><path d="M21 2v6h-6"/><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M3 22v-6h6"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/></svg>
            </Button>
          </div>
          {invoiceNumberError && (
            <div className="flex items-center mt-1 text-red-500 text-sm">
              <AlertCircle className="h-4 w-4 mr-1" />
              {invoiceNumberError}
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Issue Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {isValid(issueDate) ? format(issueDate, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={issueDate}
                  onSelect={onIssueDateChange}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Label>Due Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {isValid(dueDate) ? format(dueDate, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={dueDate}
                  onSelect={onDueDateChange}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>

      <div className="border rounded-lg p-4 mt-6">
        <h3 className="font-medium mb-4">Client Information</h3>
        <ClientInfoForm 
          clientInfo={clientInfo}
          onChange={onClientInfoChange}
        />
      </div>

      {currency && (
        <div className="text-sm text-muted-foreground">
          <p>Current currency: {currency}</p>
        </div>
      )}
    </div>
  );
};

export default InvoiceDetails;
