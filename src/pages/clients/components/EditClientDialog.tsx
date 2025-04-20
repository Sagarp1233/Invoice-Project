
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ClientFormFields } from "./ClientFormFields";
import { Client } from "../types";

interface EditClientDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  client: Client | null;
  setClient: (client: Client | null) => void;
  onEditClient: (client: Client) => void;
}

export const EditClientDialog: React.FC<EditClientDialogProps> = ({
  open,
  onOpenChange,
  client,
  setClient,
  onEditClient,
}) => {
  if (!client) return null;

  const handleFieldChange = (field: string, value: string) => {
    if (client) {
      setClient({ ...client, [field]: value });
    }
  };

  const handleSubmit = () => {
    if (client) {
      onEditClient(client);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Client</DialogTitle>
        </DialogHeader>
        
        <ClientFormFields
          client={client}
          onChange={handleFieldChange}
        />
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-invoice-purple hover:bg-invoice-darkPurple"
            disabled={!client.name || !client.email}
          >
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
