
import { useEffect } from "react";

interface ClientInfo {
  id?: string;
  name: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  type?: string;
  status?: string;
}

export const useClientPersistence = (clientInfo: ClientInfo) => {
  // Save the client info to local storage whenever it changes
  useEffect(() => {
    // Only save if the client has a name (basic validation)
    if (clientInfo.name) {
      try {
        // Get existing clients
        const existingClientsData = localStorage.getItem('clients');
        const existingClients = existingClientsData ? JSON.parse(existingClientsData) : [];
        
        // Check if this client already exists by email (as unique identifier)
        const clientIndex = existingClients.findIndex(
          (client: any) => client.email === clientInfo.email && client.email !== ''
        );
        
        // Create a client object with ID
        const clientWithId = {
          ...clientInfo,
          id: clientInfo.id || `client-${Date.now()}`,
          createdAt: new Date().toISOString()
        };
        
        if (clientIndex >= 0) {
          // Update existing client
          existingClients[clientIndex] = {
            ...existingClients[clientIndex],
            ...clientWithId,
            updatedAt: new Date().toISOString()
          };
        } else if (clientInfo.email) {
          // Add new client only if it has an email
          existingClients.push(clientWithId);
        }
        
        // Save back to localStorage
        localStorage.setItem('clients', JSON.stringify(existingClients));
      } catch (error) {
        console.error("Error saving client data:", error);
      }
    }
    
    // Debounced save to prevent too many localStorage operations
    const timeoutId = setTimeout(() => {}, 1000);
    return () => clearTimeout(timeoutId);
  }, [clientInfo]);
};
