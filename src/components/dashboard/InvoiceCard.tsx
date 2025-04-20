
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Eye, Download, Copy, Trash } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface SavedInvoice {
  id: string;
  invoiceNumber: string;
  clientInfo: {
    name: string;
  };
  createdAt: string;
  total: number;
  status?: string;
  dueDate?: string;
}

interface InvoiceCardProps {
  invoice: SavedInvoice;
  formatCurrency: (amount: number) => string;
  onDeleteInvoice: (id: string) => void;
  onDuplicateInvoice: (id: string) => void;
  bulkSelectMode?: boolean;
}

const InvoiceCard = ({
  invoice,
  formatCurrency,
  onDeleteInvoice,
  onDuplicateInvoice,
  bulkSelectMode = false
}: InvoiceCardProps) => {
  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-amber-100 text-amber-800';
      case 'Overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className={`hover:shadow-md transition-shadow ${bulkSelectMode ? 'pl-8' : ''}`}>
      <CardContent className="p-4">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium">{invoice.invoiceNumber}</h3>
              <p className="text-sm text-muted-foreground">{invoice.clientInfo.name}</p>
            </div>
            <Badge className={getStatusColor(invoice.status)}>
              {invoice.status || "Draft"}
            </Badge>
          </div>
          
          <div className="mt-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Date:</span>
              <span>{new Date(invoice.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between items-center text-sm mt-1">
              <span className="text-muted-foreground">Amount:</span>
              <span className="font-medium">{formatCurrency(invoice.total)}</span>
            </div>
          </div>

          {!bulkSelectMode && (
            <div className="flex justify-between mt-3 pt-3 border-t">
              <Button variant="ghost" size="sm" asChild>
                <Link to={`/create-invoice?edit=${invoice.id}`}>
                  <Eye className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="ghost" size="sm">
                <Download className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => onDuplicateInvoice(invoice.id)}
              >
                <Copy className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-red-500 hover:text-red-700"
                onClick={() => onDeleteInvoice(invoice.id)}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default InvoiceCard;
