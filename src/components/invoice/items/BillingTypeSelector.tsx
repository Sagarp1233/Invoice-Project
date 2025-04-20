
import { Button } from "@/components/ui/button";

interface BillingTypeSelectorProps {
  useDirectAmount: boolean;
  onToggle: (useDirectAmount: boolean) => void;
}

const BillingTypeSelector: React.FC<BillingTypeSelectorProps> = ({
  useDirectAmount,
  onToggle
}) => {
  return (
    <div className="flex items-center gap-4 mb-4">
      <Button
        type="button"
        variant={useDirectAmount ? "default" : "outline"}
        onClick={() => onToggle(true)}
        className={`flex-1 ${useDirectAmount ? "bg-invoice-purple hover:bg-invoice-darkPurple" : ""}`}
      >
        Direct Amount
      </Button>
      <Button
        type="button"
        variant={!useDirectAmount ? "default" : "outline"}
        onClick={() => onToggle(false)}
        className={`flex-1 ${!useDirectAmount ? "bg-invoice-purple hover:bg-invoice-darkPurple" : ""}`}
      >
        Itemized Billing
      </Button>
    </div>
  );
};

export default BillingTypeSelector;
