import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ClientFilterBar } from "./ClientFilterBar";
import { PaginationControls } from "./PaginationControls";
import { Client } from "../types";
import { useClientFilter } from "../hooks/useClientFilter";
import { EmptyState } from "./EmptyState";
import { Checkbox } from "@/components/ui/checkbox";

interface ClientListProps {
  clients: Client[];
  onViewClient: (client: Client) => void;
  onEditClient: (client: Client) => void;
  onDeleteClient: (client: Client) => void;
  selectedClientIds: string[];
  onToggleClientSelect: (id: string) => void;
  onToggleAll: () => void;
  allSelected: boolean;
}

export const ClientList: React.FC<ClientListProps> = ({
  clients,
  onViewClient,
  onEditClient,
  onDeleteClient,
  selectedClientIds,
  onToggleClientSelect,
  onToggleAll,
  allSelected
}) => {
  const [isAddClientOpen, setIsAddClientOpen] = useState(false);

  const {
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    typeFilter,
    setTypeFilter,
    sortBy,
    handleSort,
    paginatedClients,
    pageCount,
    currentPage,
    setCurrentPage,
    filteredClients
  } = useClientFilter(clients);

  const isSearchActive = !!searchQuery || statusFilter !== "all" || typeFilter !== "all";

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search clients by name, email or phone..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <ClientFilterBar
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          typeFilter={typeFilter}
          onTypeFilterChange={setTypeFilter}
        />
      </div>

      {selectedClientIds.length > 0 && (
        <Button
          variant="destructive"
          className="mt-2"
          onClick={() => {
            if (window.confirm("Are you sure you want to delete selected clients?")) {
              const updatedClients = clients.filter(
                (client) => !selectedClientIds.includes(client.id)
              );
              localStorage.setItem("clients", JSON.stringify(updatedClients));
              location.reload();
            }
          }}
        >
          Delete Selected ({selectedClientIds.length})
        </Button>
      )}

      {paginatedClients.length === 0 ? (
        <EmptyState
          searchActive={isSearchActive}
          onAddClient={() => setIsAddClientOpen(true)}
        />
      ) : (
        <div className="bg-white rounded-md border overflow-hidden shadow-sm">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted text-muted-foreground border-b">
              <tr>
                <th className="px-4 py-2">
                  <Checkbox checked={allSelected} onCheckedChange={onToggleAll} />
                </th>
                <th className="px-4 py-2">Client</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Phone</th>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedClients.map((client) => (
                <tr key={client.id} className="border-b">
                  <td className="px-4 py-3">
                    <Checkbox
                      checked={selectedClientIds.includes(client.id)}
                      onCheckedChange={() => onToggleClientSelect(client.id)}
                    />
                  </td>
                  <td className="px-4 py-3 font-medium">{client.name}</td>
                  <td className="px-4 py-3">{client.email}</td>
                  <td className="px-4 py-3">{client.phone}</td>
                  <td className="px-4 py-3">{client.type}</td>
                  <td className="px-4 py-3 capitalize">{client.status}</td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => onViewClient(client)}>
                      👁️
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => onEditClient(client)}>
                      ✏️
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => onDeleteClient(client)}>
                      🗑️
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {pageCount > 1 && (
            <div className="py-4 border-t">
              <PaginationControls
                currentPage={currentPage}
                pageCount={pageCount}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
