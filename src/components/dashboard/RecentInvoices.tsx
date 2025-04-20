/**
 * RecentInvoices.tsx — polished layout with inline filters and working pagination
 */

import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Edit, Download, Copy, Trash
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import MarkAsPaidWithDate from "@/components/dashboard/MarkAsPaidWithDate";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext
} from "@/components/ui/pagination";
import { DateRange } from "react-day-picker";
import { CalendarDateRangePicker } from "@/components/ui/date-range-picker";
import { saveAs } from "file-saver";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import { useAccessControl } from "@/hooks/useAccessControl";

interface SavedInvoice {
  id?: string;
  invoicenumber: string;
  clientinfo?: { name?: string };
  createdat: string;
  total: number;
  status?: string;
  is_paid?: boolean;
  dueDate?: string;
  duedate?: string;
  paid_date?: string;
}

interface RecentInvoicesProps {
  savedInvoices: SavedInvoice[];
  formatCurrency: (amount: number) => string;
  onDeleteInvoice: (id: string) => void;
  onDuplicateInvoice: (id: string) => void;
  onDownloadInvoice: (invoice: SavedInvoice) => void;
  onMarkAsPaid: (invoiceId: string, paidDate: Date) => void;
}

const getStatus = (invoice: SavedInvoice): string => {
  const today = new Date();
  const dueRaw = invoice.dueDate || invoice.duedate;
  const due = dueRaw ? new Date(dueRaw) : null;
  if (invoice.status === "cancelled") return "cancelled";
  if (invoice.status === "draft") return "draft";
  if (invoice.is_paid) return "paid";
  if (due && due < today) return "overdue";
  return "pending";
};

const getBadgeClass = (status: string): string => {
  const base = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize";
  switch (status) {
    case "overdue": return `${base} bg-red-100 text-red-800`;
    case "pending": return `${base} bg-amber-100 text-amber-800`;
    case "paid": return `${base} bg-green-100 text-green-800`;
    case "cancelled": return `${base} bg-gray-100 text-gray-800`;
    case "draft": return `${base} bg-gray-100 text-gray-600`;
    default: return `${base} bg-gray-100 text-gray-600`;
  }
};

const RecentInvoices = ({
  savedInvoices,
  formatCurrency,
  onDeleteInvoice,
  onDuplicateInvoice,
  onDownloadInvoice,
  onMarkAsPaid
}: RecentInvoicesProps) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { isPro } = useAccessControl();

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]);
  };

  const handleExportCSV = () => {
    const csvData = savedInvoices.map(inv => ({
      "Invoice #": inv.invoicenumber,
      Client: inv.clientinfo?.name || "",
      Date: inv.createdat,
      Amount: formatCurrency(inv.total),
      Status: getStatus(inv),
      "Paid Date": inv.paid_date || ""
    }));
    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "invoices.csv");
  };

  const handleExportExcel = () => {
    const excelData = savedInvoices.map(inv => ({
      "Invoice #": inv.invoicenumber,
      Client: inv.clientinfo?.name || "",
      Date: inv.createdat,
      Amount: formatCurrency(inv.total),
      Status: getStatus(inv),
      "Paid Date": inv.paid_date || ""
    }));
    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Invoices");
    XLSX.writeFile(wb, "invoices.xlsx");
  };

  const filteredInvoices = useMemo(() => {
    return savedInvoices.filter((invoice) => {
      const searchText = searchTerm.toLowerCase();
      const matchesSearch = invoice.invoicenumber.toLowerCase().includes(searchText) || invoice.clientinfo?.name?.toLowerCase().includes(searchText);
      const matchesStatus = statusFilter === "All" || getStatus(invoice) === statusFilter.toLowerCase();
      const invoiceDate = new Date(invoice.createdat);
      const matchesDateRange = !dateRange || (
        invoiceDate >= (dateRange.from ?? new Date(0)) &&
        invoiceDate <= (dateRange.to ?? new Date())
      );
      return matchesSearch && matchesStatus && matchesDateRange;
    });
  }, [savedInvoices, searchTerm, statusFilter, dateRange]);

  const paginatedInvoices = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredInvoices.slice(start, start + itemsPerPage);
  }, [filteredInvoices, currentPage]);

  const totalPages = Math.ceil(filteredInvoices.length / itemsPerPage);

  return (
    <Card className="shadow-md border bg-white">
      <CardHeader className="pb-2">
        <div className="mb-4">
          <CardTitle className="text-2xl font-semibold text-gray-900">Recent Invoices</CardTitle>
          <CardDescription className="text-sm text-gray-500">Manage and track your invoice history</CardDescription>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
          <Input
            type="text"
            placeholder="Search invoices..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Paid">Paid</SelectItem>
              <SelectItem value="Overdue">Overdue</SelectItem>
            </SelectContent>
          </Select>
          <CalendarDateRangePicker dateRange={dateRange} setDateRange={setDateRange} />
          <Button onClick={handleExportCSV} variant="secondary" className="w-full" disabled={!isPro}>Export CSV</Button>
          <Button onClick={handleExportExcel} variant="secondary" className="w-full" disabled={!isPro}>Export Excel</Button>
        </div>
      </CardHeader>

      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="py-3 px-2"></th>
                <th className="py-3 text-left font-medium">Invoice #</th>
                <th className="py-3 text-left font-medium">Client</th>
                <th className="py-3 text-left font-medium">Date</th>
                <th className="py-3 text-right font-medium">Amount</th>
                <th className="py-3 text-center font-medium">Status</th>
                <th className="py-3 text-center font-medium">Paid Date</th>
                <th className="py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedInvoices.map((invoice) => {
                const status = getStatus(invoice);
                const isChecked = selectedIds.includes(invoice.id || "");
                return (
                  <tr key={invoice.id || Math.random()} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-2">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => invoice.id && toggleSelect(invoice.id)}
                      />
                    </td>
                    <td className="py-3">{invoice.invoicenumber}</td>
                    <td className="py-3">{invoice.clientinfo?.name || "Client name"}</td>
                    <td className="py-3">{new Date(invoice.createdat).toLocaleDateString()}</td>
                    <td className="py-3 text-right">{formatCurrency(invoice.total)}</td>
                    <td className="py-3 text-center">
                      <span className={getBadgeClass(status)}>{status}</span>
                    </td>
                    <td className="py-3 text-center">
                      {invoice.paid_date ? new Date(invoice.paid_date).toLocaleDateString() : "-"}
                    </td>
                    <td className="py-3 text-right space-x-2">
                      <MarkAsPaidWithDate
                        invoiceId={invoice.id!}
                        status={status}
                        onConfirm={onMarkAsPaid}
                      />
                      <Button variant="ghost" size="sm" asChild>
                        <Link to={`/create-invoice?edit=${invoice.id}`}><Edit className="h-4 w-4" /></Link>
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => onDownloadInvoice(invoice)}>
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => invoice.id && onDuplicateInvoice(invoice.id)}>
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700" onClick={() => invoice.id && onDeleteInvoice(invoice.id)}>
                        <Trash className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <Pagination>
          <PaginationContent>
            {currentPage > 1 && (
              <PaginationItem>
                <PaginationPrevious onClick={() => setCurrentPage(currentPage - 1)} />
              </PaginationItem>
            )}
            {Array.from({ length: totalPages }, (_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  isActive={currentPage === index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            {currentPage < totalPages && (
              <PaginationItem>
                <PaginationNext onClick={() => setCurrentPage(currentPage + 1)} />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      </CardContent>
    </Card>
  );
};

export default RecentInvoices;