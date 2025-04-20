
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar, FileText, Mail, Plus } from "lucide-react";
import { Client } from "../types";
import { formatCurrency, formatDate } from "../utils/formatters";
import { ClientBadges } from "./ClientBadges";

interface ViewClientDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  client: Client | null;
  onEdit?: () => void;  // Added the missing onEdit prop
}

export const ViewClientDialog: React.FC<ViewClientDialogProps> = ({
  open,
  onOpenChange,
  client,
  onEdit,
}) => {
  if (!client) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-14 w-14 border">
              <AvatarImage src={client.logoUrl} alt={client.name} />
              <AvatarFallback className="bg-invoice-lightPurple text-invoice-darkPurple text-xl">
                {client.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <DialogTitle className="text-2xl mb-1">{client.name}</DialogTitle>
              <ClientBadges status={client.status} type={client.type} />
            </div>
          </div>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Contact Information</h3>
            
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{client.email}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-medium">{client.phone}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Address</p>
              <p className="font-medium">{client.address}</p>
            </div>
            
            {client.notes && (
              <div>
                <p className="text-sm text-gray-500">Notes</p>
                <p>{client.notes}</p>
              </div>
            )}
            
            {client.tags && client.tags.length > 0 && (
              <div>
                <p className="text-sm text-gray-500 mb-1">Tags</p>
                <div className="flex flex-wrap gap-1">
                  {client.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="bg-gray-100">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Invoice Summary</h3>
            
            <div className="bg-gray-50 p-4 rounded-md">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Total Invoices</p>
                  <p className="text-2xl font-semibold">{client.invoiceCount}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Outstanding Balance</p>
                  <p className={`text-2xl font-semibold ${client.outstandingBalance ? 'text-amber-600' : 'text-green-600'}`}>
                    {formatCurrency(client.outstandingBalance || 0)}
                  </p>
                </div>
                
                {client.lastInvoiceDate && (
                  <div className="col-span-2">
                    <p className="text-sm text-gray-500">Last Invoice</p>
                    <p className="font-medium">{formatDate(client.lastInvoiceDate)}</p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex flex-col space-y-2">
              <Button className="bg-invoice-purple hover:bg-invoice-darkPurple" asChild>
                <Link to="/create-invoice">
                  <Plus className="h-4 w-4 mr-2" /> Create Invoice
                </Link>
              </Button>
              
              <Button variant="outline">
                <Mail className="h-4 w-4 mr-2" /> Send Email
              </Button>
              
              <Button variant="outline">
                <FileText className="h-4 w-4 mr-2" /> View History
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
