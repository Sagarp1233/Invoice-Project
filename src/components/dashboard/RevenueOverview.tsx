import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  DollarSign,
  IndianRupee,
  Euro,
  PoundSterling,
  JapaneseYen,
  RussianRuble,
  SwissFranc,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Invoice {
  createdat: string;
  total: number;
}

interface RevenueOverviewProps {
  savedInvoices: Invoice[];
  currency: string;
  timeframe: number;
  setTimeframe: (value: number) => void;
}

const getCurrencyIcon = (currency: string) => {
  switch (currency) {
    case "INR":
      return <IndianRupee className="w-4 h-4 text-green-600" />;
    case "EUR":
      return <Euro className="w-4 h-4 text-green-600" />;
    case "GBP":
      return <PoundSterling className="w-4 h-4 text-green-600" />;
    case "JPY":
      return <JapaneseYen className="w-4 h-4 text-green-600" />;
    case "RUB":
      return <RussianRuble className="w-4 h-4 text-green-600" />;
    case "CHF":
      return <SwissFranc className="w-4 h-4 text-green-600" />;
    default:
      return <DollarSign className="w-4 h-4 text-green-600" />;
  }
};

const RevenueOverview = ({
  savedInvoices = [],
  currency,
  timeframe,
  setTimeframe,
}: RevenueOverviewProps) => {
  const now = new Date();
  const months = [];

  for (let i = timeframe - 1; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const label = date.toLocaleString("default", {
      month: "short",
      year: "numeric",
    });
    const key = `${date.getFullYear()}-${date.getMonth()}`;
    months.push({ key, label, total: 0 });
  }

  savedInvoices.forEach((invoice) => {
    const date = new Date(invoice.createdat);
    const key = `${date.getFullYear()}-${date.getMonth()}`;
    const match = months.find((m) => m.key === key);
    if (match) {
      match.total += Number(invoice.total);
    }
  });

  const chartData = months.map((m) => ({ month: m.label, total: m.total }));

  const prevMonth = months[months.length - 2]?.total || 0;
  const thisMonth = months[months.length - 1]?.total || 0;
  const growth =
    prevMonth === 0 ? (thisMonth > 0 ? 100 : 0) : ((thisMonth - prevMonth) / prevMonth) * 100;

  const hasRevenue = chartData.some((m) => m.total > 0);

  return (
    <Card className="mt-6">
      <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <CardTitle>Revenue Overview</CardTitle>
          <CardDescription>Monthly revenue for the last {timeframe} months</CardDescription>
        </div>
        <select
          className="text-sm border rounded px-2 py-1 mt-2 md:mt-0 text-muted-foreground"
          value={timeframe}
          onChange={(e) => setTimeframe(Number(e.target.value))}
        >
          <option value={3}>Last 3 months</option>
          <option value={6}>Last 6 months</option>
          <option value={12}>Last 12 months</option>
        </select>
      </CardHeader>

      <CardContent>
        {hasRevenue ? (
          <>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(val) => `${val}`} />
                  <Tooltip
                    formatter={(value: number) => `${currency} ${value.toFixed(2)}`}
                  />
                  <Area
                    type="monotone"
                    dataKey="total"
                    stroke="#8b5cf6"
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 flex items-center text-sm font-medium space-x-2">
              <div className="flex items-center gap-1">
                {getCurrencyIcon(currency)}
                {growth > 0 && <span className="text-green-600">↑ Growth: {growth.toFixed(2)}%</span>}
                {growth < 0 && <span className="text-red-500">↓ Drop: {Math.abs(growth).toFixed(2)}%</span>}
                {growth === 0 && <span className="text-muted-foreground">No Growth</span>}
              </div>
              <span className="text-muted-foreground">· This Month vs Last Month</span>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center text-center text-muted-foreground py-12">
            <DollarSign className="h-10 w-10 mb-4 text-muted-foreground/50" />
            <p className="text-lg font-medium">No Revenue Data</p>
            <p className="text-sm mt-1 max-w-md">
              Start creating invoices to see your revenue overview and track your business growth.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RevenueOverview;
