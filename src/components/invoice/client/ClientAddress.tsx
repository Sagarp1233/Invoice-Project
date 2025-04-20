
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ClientAddressProps {
  address: string;
  onChange: (value: string) => void;
}

const ClientAddress = ({ address, onChange }: ClientAddressProps) => {
  return (
    <div>
      <Label htmlFor="clientAddress">Street Address</Label>
      <Textarea
        id="clientAddress"
        value={address}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter street address"
        rows={2}
      />
    </div>
  );
};

export default ClientAddress;
