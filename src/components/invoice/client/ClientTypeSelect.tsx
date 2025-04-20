
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { clientTypes } from "@/utils/locationData";

interface ClientTypeSelectProps {
  value: string;
  onChange: (value: string) => void;
}

const ClientTypeSelect = ({ value, onChange }: ClientTypeSelectProps) => {
  return (
    <div>
      <Label htmlFor="clientType">Client Type</Label>
      <Select 
        value={value || 'business'} 
        onValueChange={(value) => onChange(value)}
      >
        <SelectTrigger id="clientType" className="w-full">
          <SelectValue placeholder="Select client type" />
        </SelectTrigger>
        <SelectContent>
          {clientTypes.map((type) => (
            <SelectItem key={type.value} value={type.value}>
              {type.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ClientTypeSelect;
