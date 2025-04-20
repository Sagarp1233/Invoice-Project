// src/components/invoice/items/InvoiceItemRow.tsx
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Trash2 } from "lucide-react";
import { InvoiceItem } from "../../../hooks/invoice/useInvoiceItems";

interface InvoiceItemRowProps {
  item: InvoiceItem;
  onUpdate: (id: string, field: keyof InvoiceItem, value: string | number) => void;
  onRemove: (id: string) => void;
  canDelete: boolean;
}

const InvoiceItemRow: React.FC<InvoiceItemRowProps> = ({
  item,
  onUpdate,
  onRemove,
  canDelete,
}) => {
  return (
    <TableRow key={item.id}>
      <TableCell className="p-2">
        <Input
          value={item.description}
          onChange={(e) => onUpdate(item.id, "description", e.target.value)}
          placeholder="Item description"
        />
      </TableCell>
      <TableCell className="p-2">
        <Input
          type="number"
          value={item.quantity}
          onChange={(e) => onUpdate(item.id, "quantity", Number(e.target.value))}
        />
      </TableCell>
      <TableCell className="p-2">
        <Input
          type="number"
          value={item.price}
          onChange={(e) => onUpdate(item.id, "price", Number(e.target.value))}
        />
      </TableCell>
      <TableCell className="font-medium text-right p-2">
        {item.total > 0 ? `INR ${item.total.toFixed(2)}` : "INR 0.00"}
      </TableCell>
      <TableCell className="p-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onRemove(item.id)}
          disabled={!canDelete}
        >
          <Trash2 className="h-4 w-4 text-muted-foreground" />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default InvoiceItemRow;
