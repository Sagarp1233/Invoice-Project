import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ClientFormFields } from "./ClientFormFields";
import { NewClient } from "../types";

interface AddClientDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddClient: (client: NewClient) => void;
}

export const AddClientDialog: React.FC<AddClientDialogProps> = ({
  open,
  onOpenChange,
  onAddClient,
}) => {
  const [newClient, setNewClient] = useState<NewClient>({
    name: "",
    email: "",
    phone: "",
    address: "",
    invoiceCount: 0,
    status: "active",
    type: "business",
    notes: "",
    tags: [],
  });

  const handleFieldChange = (field: string, value: string) => {
    setNewClient((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    const clientWithId = { ...newClient, id: uuidv4() }; // 🔑 Add unique ID
    console.log("🆕 Submitting client:", clientWithId);
    onAddClient(clientWithId);
    setNewClient({
      name: "",
      email: "",
      phone: "",
      address: "",
      invoiceCount: 0,
      status: "active",
      type: "business",
      notes: "",
      tags: [],
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Client</DialogTitle>
        </DialogHeader>

        <ClientFormFields
          formData={newClient}
          isNewClient={true}
          onChange={handleFieldChange}
        />

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-invoice-purple hover:bg-invoice-darkPurple"
            disabled={!newClient.name || !newClient.email}
          >
            Add Client
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
