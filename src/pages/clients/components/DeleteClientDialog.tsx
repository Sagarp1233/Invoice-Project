
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Client } from "../types";

interface DeleteClientDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  client: Client | null;
  onDeleteClient: (client: Client) => void;
}

export const DeleteClientDialog: React.FC<DeleteClientDialogProps> = ({
  open,
  onOpenChange,
  client,
  onDeleteClient,
}) => {
  if (!client) return null;

  const handleDelete = () => {
    onDeleteClient(client);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete Client</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p>
            Are you sure you want to delete <strong>{client.name}</strong>? This action
            cannot be undone.
          </p>
          {client && client.invoiceCount > 0 && (
            <p className="mt-2 text-amber-600">
              Warning: This client has {client.invoiceCount} invoices associated with them.
            </p>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
          >
            Delete Client
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
