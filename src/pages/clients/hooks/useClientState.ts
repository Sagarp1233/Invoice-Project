
import { useState, useEffect } from 'react';
import { Client } from '../types';

export const useClientState = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get clients from localStorage
    const fetchClients = () => {
      setIsLoading(true);
      try {
        const storedClients = localStorage.getItem('clients');
        if (storedClients) {
          setClients(JSON.parse(storedClients));
        }
      } catch (error) {
        console.error('Error loading clients:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchClients();
  }, []);

  const handleSaveClient = (client: Client) => {
    // Add ID if it's a new client
    const newClient = client.id ? client : { ...client, id: Date.now().toString() };
    
    let updatedClients: Client[];
    
    if (client.id) {
      // Update existing client
      updatedClients = clients.map(c => c.id === client.id ? newClient : c);
    } else {
      // Add new client
      updatedClients = [...clients, newClient];
    }
    
    // Save to localStorage
    localStorage.setItem('clients', JSON.stringify(updatedClients));
    setClients(updatedClients);
    
    // Close dialogs
    setIsAddDialogOpen(false);
    setIsEditDialogOpen(false);
  };

  const handleDeleteClient = (clientId: string) => {
    const updatedClients = clients.filter(client => client.id !== clientId);
    localStorage.setItem('clients', JSON.stringify(updatedClients));
    setClients(updatedClients);
    setIsDeleteDialogOpen(false);
  };

  const openAddDialog = () => {
    setSelectedClient(null);
    setIsAddDialogOpen(true);
  };

  const openEditDialog = (client: Client) => {
    setSelectedClient(client);
    setIsEditDialogOpen(true);
  };

  const openViewDialog = (client: Client) => {
    setSelectedClient(client);
    setIsViewDialogOpen(true);
  };

  const openDeleteDialog = (client: Client) => {
    setSelectedClient(client);
    setIsDeleteDialogOpen(true);
  };

  return {
    clients,
    isLoading,
    isAddDialogOpen,
    isEditDialogOpen,
    isViewDialogOpen,
    isDeleteDialogOpen,
    selectedClient,
    setIsAddDialogOpen,
    setIsEditDialogOpen,
    setIsViewDialogOpen,
    setIsDeleteDialogOpen,
    handleSaveClient,
    handleDeleteClient,
    openAddDialog,
    openEditDialog,
    openViewDialog,
    openDeleteDialog
  };
};
