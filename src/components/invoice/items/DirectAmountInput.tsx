
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DirectAmountInputProps {
  amount: number | null;
  onChange: (value: string) => void;
  currency?: string;
}

const DirectAmountInput: React.FC<DirectAmountInputProps> = ({ amount, onChange, currency }) => {
  return (
    <div className="border rounded-md p-4">
      <div className="space-y-4">
        <div>
          <Label htmlFor="invoiceAmount">Invoice Amount {currency ? `(${currency})` : ''}</Label>
          <Input
            id="invoiceAmount"
            type="number"
            min={0}
            step={0.01}
            value={amount || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Enter invoice amount"
            className="mt-1"
          />
        </div>
      </div>
    </div>
  );
};

export default DirectAmountInput;
