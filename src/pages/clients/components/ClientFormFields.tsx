import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { clientTypes } from "@/utils/locationData";
import { NewClient } from "../types";

interface ClientFormFieldsProps {
  formData: NewClient;
  isNewClient?: boolean;
  onChange: (field: string, value: string) => void;
}

export const ClientFormFields: React.FC<ClientFormFieldsProps> = ({
  formData,
  isNewClient = false,
  onChange,
}) => {
  console.log("📋 ClientFormFields received formData:", formData);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  const handleStatusChange = (value: string) => {
    onChange("status", value);
  };

  const handleTypeChange = (value: string) => {
    onChange("type", value);
  };

  return (
    <div className="grid gap-4 py-4">
      <div className="grid gap-2">
        <Label htmlFor="name">Client Name</Label>
        <Input
          id="name"
          name="name"
          placeholder="Client or Company Name"
          value={formData.name}
          onChange={handleInputChange}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="client@example.com"
          value={formData.email}
          onChange={handleInputChange}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          name="phone"
          placeholder="+1 (555) 123-4567"
          value={formData.phone}
          onChange={handleInputChange}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="address">Address</Label>
        <Textarea
          id="address"
          name="address"
          placeholder="Full mailing address"
          rows={3}
          value={formData.address}
          onChange={handleInputChange}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="status">Status</Label>
          <Select value={formData.status} onValueChange={handleStatusChange}>
            <SelectTrigger id="status">
              <SelectValue placeholder="Select client status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="type">Client Type</Label>
          <Select value={formData.type} onValueChange={handleTypeChange}>
            <SelectTrigger id="type">
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
      </div>
      <div className="grid gap-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          name="notes"
          placeholder="Any notes about this client"
          rows={3}
          value={formData.notes}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};
