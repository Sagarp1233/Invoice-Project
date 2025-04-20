// src/components/invoice/items/InvoiceItemsTable.tsx
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import InvoiceItemRow from "./InvoiceItemRow";
import { InvoiceItem } from "../../../hooks/invoice/useInvoiceItems";

interface InvoiceItemsTableProps {
  items: InvoiceItem[];
  onUpdateItem: (id: string, field: keyof InvoiceItem, value: string | number) => void;
  onRemoveItem: (id: string) => void;
  onAddItem: () => void;
  currency?: string;
}

const InvoiceItemsTable: React.FC<InvoiceItemsTableProps> = ({
  items,
  onUpdateItem,
  onRemoveItem,
  onAddItem,
  currency = "INR",
}) => {
  return (
    <div className="space-y-4">
      <div className="rounded-md border overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40%]">Description</TableHead>
              <TableHead className="w-[15%]">Quantity</TableHead>
              <TableHead className="w-[20%]">Price ({currency})</TableHead>
              <TableHead className="w-[15%]">Total</TableHead>
              <TableHead className="w-[10%] text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <InvoiceItemRow
                key={item.id}
                item={item}
                onUpdate={onUpdateItem}
                onRemove={onRemoveItem}
                canDelete={items.length > 1}
              />
            ))}
          </TableBody>
        </Table>
      </div>

      <Button
        variant="outline"
        size="sm"
        className="flex items-center"
        onClick={onAddItem}
      >
        <Plus className="mr-2 h-4 w-4" /> Add Item
      </Button>
    </div>
  );
};

export default InvoiceItemsTable;
