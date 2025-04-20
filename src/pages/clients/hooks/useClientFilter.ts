
import { useMemo, useState } from "react";
import { Client } from "../types";

export const useClientFilter = (clients: Client[]) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<{ field: keyof Client; direction: 'asc' | 'desc' }>({ 
    field: 'name', 
    direction: 'asc' 
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  // Filter clients based on search query, status and type filters
  const filteredClients = useMemo(() => {
    return clients.filter(client => {
      const matchesSearch = 
        client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.phone.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = 
        statusFilter === "all" || 
        client.status === statusFilter;
      
      const matchesType =
        typeFilter === "all" ||
        client.type === typeFilter;
      
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [clients, searchQuery, statusFilter, typeFilter]);

  // Sort clients
  const sortedClients = useMemo(() => {
    return [...filteredClients].sort((a, b) => {
      const fieldA = a[sortBy.field];
      const fieldB = b[sortBy.field];
      
      if (fieldA < fieldB) return sortBy.direction === 'asc' ? -1 : 1;
      if (fieldA > fieldB) return sortBy.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredClients, sortBy]);

  // Handle pagination
  const paginatedClients = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedClients.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedClients, currentPage, itemsPerPage]);

  const pageCount = Math.ceil(sortedClients.length / itemsPerPage);

  // Toggle sort direction
  const handleSort = (field: keyof Client) => {
    setSortBy(prev => ({
      field,
      direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  return {
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
  };
};
