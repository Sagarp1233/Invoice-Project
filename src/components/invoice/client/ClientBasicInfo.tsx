
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ClientBasicInfoProps {
  name: string;
  email: string;
  onNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
}

const ClientBasicInfo = ({ name, email, onNameChange, onEmailChange }: ClientBasicInfoProps) => {
  return (
    <div className="grid gap-4">
      <div>
        <Label htmlFor="clientName">Client Name</Label>
        <Input
          id="clientName"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="Enter client or company name"
        />
      </div>
      
      <div>
        <Label htmlFor="clientEmail">Email</Label>
        <Input
          id="clientEmail"
          type="email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          placeholder="client@example.com"
        />
      </div>
    </div>
  );
};

export default ClientBasicInfo;
