
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { clientStatus } from "@/utils/locationData";

interface ClientStatusSelectProps {
  value: string;
  onChange: (value: string) => void;
}

const ClientStatusSelect = ({ value, onChange }: ClientStatusSelectProps) => {
  return (
    <div>
      <Label htmlFor="clientStatus">Status</Label>
      <Select 
        value={value || 'active'} 
        onValueChange={(value) => onChange(value)}
      >
        <SelectTrigger id="clientStatus" className="w-full">
          <SelectValue placeholder="Select client status" />
        </SelectTrigger>
        <SelectContent>
          {clientStatus.map((status) => (
            <SelectItem key={status.value} value={status.value}>
              {status.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ClientStatusSelect;
