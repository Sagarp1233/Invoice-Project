import { useState } from "react";
import { Search, ArrowUp, ArrowDown } from "lucide-react";
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
  allSelected,
}) => {
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
    filteredClients,
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

      {paginatedClients.length === 0 ? (
        <EmptyState searchActive={isSearchActive} onAddClient={() => {}} />
      ) : (
        <div className="bg-white rounded-md border overflow-hidden shadow-sm">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted text-muted-foreground border-b">
              <tr>
                <th className="px-4 py-2">
                  <Checkbox checked={allSelected} onCheckedChange={onToggleAll} />
                </th>
                <th className="px-4 py-2">Client</th>
                <th className="px-4 py-2">Contact</th>
                <th className="px-4 py-2">Address</th>
                <th className="px-4 py-2">Invoices</th>
                <th className="px-4 py-2">Outstanding</th>
                <th className="px-4 py-2">Actions</th>
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
                  <td className="px-4 py-3">{client.address}</td>
                  <td className="px-4 py-3">{client.invoiceCount || 0}</td>
                  <td className="px-4 py-3 text-green-600">${(client.invoiceCount || 0) * 0}.00</td>
                  <td className="px-4 py-3 space-x-2">
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
