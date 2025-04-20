import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { ClientList } from "./components/ClientList";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AddClientDialog } from "./components/AddClientDialog";
import { EditClientDialog } from "./components/EditClientDialog";
import { ViewClientDialog } from "./components/ViewClientDialog";
import { DeleteClientDialog } from "./components/DeleteClientDialog";
import { Client } from "./types";

const Clients = () => {
  const { toast } = useToast();
  const [clients, setClients] = useState<Client[] | null>(null); // null = loading state
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isAddClientDialogOpen, setIsAddClientDialogOpen] = useState(false);
  const [isEditClientDialogOpen, setIsEditClientDialogOpen] = useState(false);
  const [isViewClientDialogOpen, setIsViewClientDialogOpen] = useState(false);
  const [isDeleteClientDialogOpen, setIsDeleteClientDialogOpen] = useState(false);
  const [selectedClientIds, setSelectedClientIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("clients");
      const parsed = saved ? JSON.parse(saved) : [];
      console.log("✅ Setting clients from localStorage:", parsed);
      setClients(parsed);
    } catch (error) {
      console.error("❌ Failed to load clients:", error);
      setClients([]);
    }
  }, []);

  const syncToLocalStorage = (updated: Client[]) => {
    localStorage.setItem("clients", JSON.stringify(updated));
  };

  const handleAddClient = (newClient: Client) => {
    const updated = [...(clients ?? []), newClient];
    setClients(updated);
    syncToLocalStorage(updated);
    setIsAddClientDialogOpen(false);
    toast({ title: "Success", description: "Client added successfully" });
  };

  const handleUpdateClient = (updatedClient: Client) => {
    if (!clients) return;
    const updated = clients.map(c => c.id === updatedClient.id ? updatedClient : c);
    setClients(updated);
    syncToLocalStorage(updated);
    setIsEditClientDialogOpen(false);
    toast({ title: "Success", description: "Client updated successfully" });
  };

  const handleDeleteClient = (client: Client) => {
    if (!clients) return;
    const updated = clients.filter(c => c.id !== client.id);
    setClients(updated);
    syncToLocalStorage(updated);
    setIsDeleteClientDialogOpen(false);
    toast({ title: "Success", description: "Client deleted successfully" });
  };

  const handleViewClient = (client: Client) => {
    setSelectedClient(client);
    setIsViewClientDialogOpen(true);
  };

  const handleEditClient = (client: Client) => {
    setSelectedClient(client);
    setIsEditClientDialogOpen(true);
  };

  const handleDeleteConfirm = (client: Client) => {
    setSelectedClient(client);
    setIsDeleteClientDialogOpen(true);
  };

  const handleToggleClientSelect = (id: string) => {
    setSelectedClientIds(prev =>
      prev.includes(id) ? prev.filter(cid => cid !== id) : [...prev, id]
    );
  };

  const handleToggleAllClients = () => {
    if (!clients) return;
    if (selectedClientIds.length === clients.length) {
      setSelectedClientIds([]);
    } else {
      setSelectedClientIds(clients.map(c => c.id));
    }
  };

  return (
    <DashboardLayout>
      <div className="container space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Clients</h1>
            <p className="text-muted-foreground">Manage your client information and track their details</p>
          </div>
          <Button
            className="bg-invoice-purple hover:bg-invoice-darkPurple"
            onClick={() => setIsAddClientDialogOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Client
          </Button>
        </div>

        {clients === null ? (
          <div className="text-center py-10 text-muted-foreground">Loading clients...</div>
        ) : (
          <ClientList
            clients={clients}
            onViewClient={handleViewClient}
            onEditClient={handleEditClient}
            onDeleteClient={handleDeleteConfirm}
            selectedClientIds={selectedClientIds}
            onToggleClientSelect={handleToggleClientSelect}
            onToggleAll={handleToggleAllClients}
            allSelected={clients.length > 0 && selectedClientIds.length === clients.length}
          />
        )}
      </div>

      <AddClientDialog
        open={isAddClientDialogOpen}
        onOpenChange={setIsAddClientDialogOpen}
        onAddClient={handleAddClient}
      />

      {selectedClient && (
        <>
          <ViewClientDialog
            client={selectedClient}
            open={isViewClientDialogOpen}
            onOpenChange={setIsViewClientDialogOpen}
            onEdit={() => {
              setIsViewClientDialogOpen(false);
              setIsEditClientDialogOpen(true);
            }}
          />

          <EditClientDialog
            client={selectedClient}
            open={isEditClientDialogOpen}
            onOpenChange={setIsEditClientDialogOpen}
            onEditClient={handleUpdateClient}
            setClient={setSelectedClient}
          />

          <DeleteClientDialog
            client={selectedClient}
            open={isDeleteClientDialogOpen}
            onOpenChange={setIsDeleteClientDialogOpen}
            onDeleteClient={handleDeleteClient}
          />
        </>
      )}
    </DashboardLayout>
  );
};

export default Clients;