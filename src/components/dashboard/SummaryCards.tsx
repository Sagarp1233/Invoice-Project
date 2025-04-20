import { 
  DollarSign, 
  Clock, 
  AlertCircle, 
  BarChart3,
  PoundSterling,
  Euro,
  JapaneseYen,
  IndianRupee,
  RussianRuble,
  SwissFranc,
  CheckCircle
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

type Currency = 'INR' | 'USD' | 'EUR' | 'GBP' | 'JPY' | 'CHF' | 'RUB';

interface SummaryCardsProps {
  totalRevenue: number;
  pendingAmount: number;
  overdueAmount: number;
  savedInvoices: any[];
  pendingInvoices: any[];
  overdueInvoices: any[];
  formatCurrency: (amount: number) => string;
  currency: Currency;
}

const SummaryCards = ({
  totalRevenue,
  pendingAmount,
  overdueAmount,
  savedInvoices,
  pendingInvoices,
  overdueInvoices,
  formatCurrency,
  currency
}: SummaryCardsProps) => {

  const getCurrencyIcon = (currencyCode: Currency) => {
    switch (currencyCode) {
      case 'INR': return <IndianRupee className="h-5 w-5 text-invoice-purple" />;
      case 'USD': return <DollarSign className="h-5 w-5 text-invoice-purple" />;
      case 'EUR': return <Euro className="h-5 w-5 text-invoice-purple" />;
      case 'GBP': return <PoundSterling className="h-5 w-5 text-invoice-purple" />;
      case 'JPY': return <JapaneseYen className="h-5 w-5 text-invoice-purple" />;
      case 'CHF': return <SwissFranc className="h-5 w-5 text-invoice-purple" />;
      case 'RUB': return <RussianRuble className="h-5 w-5 text-invoice-purple" />;
      default: return <DollarSign className="h-5 w-5 text-invoice-purple" />;
    }
  };

  const safeTotal = isNaN(totalRevenue) ? 0 : totalRevenue;
  const safePending = isNaN(pendingAmount) ? 0 : pendingAmount;
  const safeOverdue = isNaN(overdueAmount) ? 0 : overdueAmount;
  const paidInvoices = savedInvoices.filter(inv => inv.is_paid);
  const paidAmount = paidInvoices.reduce((sum, inv) => sum + Number(inv.total || 0), 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
              <h3 className="text-2xl font-bold mt-1">{formatCurrency(safeTotal)}</h3>
            </div>
            <div className="h-10 w-10 rounded-full bg-invoice-lightPurple/30 flex items-center justify-center">
              {getCurrencyIcon(currency)}
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {savedInvoices.length > 0 
              ? `From ${savedInvoices.length} invoice${savedInvoices.length > 1 ? 's' : ''}`
              : "Start creating invoices to track revenue"}
          </p>
        </CardContent>
      </Card>
	   <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Paid</p>
              <h3 className="text-2xl font-bold mt-1">{formatCurrency(paidAmount)}</h3>
            </div>
            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {paidInvoices.length > 0 
              ? `${paidInvoices.length} paid invoice${paidInvoices.length > 1 ? 's' : ''}`
              : "No paid invoices yet"}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Pending</p>
              <h3 className="text-2xl font-bold mt-1">{formatCurrency(safePending)}</h3>
            </div>
            <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
              <Clock className="h-5 w-5 text-amber-600" />
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {pendingInvoices.length > 0 
              ? `${pendingInvoices.length} pending invoice${pendingInvoices.length > 1 ? 's' : ''}`
              : "No pending invoices"}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Overdue</p>
              <h3 className="text-2xl font-bold mt-1">{formatCurrency(safeOverdue)}</h3>
            </div>
            <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
              <AlertCircle className="h-5 w-5 text-red-600" />
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {overdueInvoices.length > 0 
              ? `${overdueInvoices.length} overdue invoice${overdueInvoices.length > 1 ? 's' : ''}`
              : "No overdue invoices"}
          </p>
        </CardContent>
      </Card>

     

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Invoices</p>
              <h3 className="text-2xl font-bold mt-1">{savedInvoices.length}</h3>
            </div>
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
              <BarChart3 className="h-5 w-5 text-blue-600" />
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {savedInvoices.length > 0 
              ? `Created ${savedInvoices.length} invoice${savedInvoices.length > 1 ? 's' : ''}`
              : "Create your first invoice"}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SummaryCards;