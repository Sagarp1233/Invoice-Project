export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  invoiceCount: number;
  status: "active" | "inactive";
  type: string;
  logoUrl?: string;
  lastInvoiceDate?: string;
  outstandingBalance?: number;
  tags?: string[];
  notes?: string;
}

export interface NewClient extends Omit<Client, 'id' | 'logoUrl' | 'lastInvoiceDate' | 'outstandingBalance'> {}
