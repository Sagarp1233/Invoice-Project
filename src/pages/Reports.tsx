import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { FileDown, ArrowUpRight, ArrowDownRight } from "lucide-react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { supabase } from "@/lib/supabase";
import { useAccessControl } from "@/hooks/useAccessControl"; // ✅ New import

const Reports = () => {
  const { isPro } = useAccessControl(); // ✅ Pro access check
  const [timeframe, setTimeframe] = useState("year");
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [isLoading, setIsLoading] = useState(false);
  const [revenueChart, setRevenueChart] = useState<number[]>([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [averageInvoice, setAverageInvoice] = useState(0);
  const [paymentTime, setPaymentTime] = useState(0);

  useEffect(() => {
    if (!isPro) return; // Don’t fetch if not Pro
    const fetchRevenue = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('invoices')
        .select('*')
        .gte('issueDate', `${year}-01-01`)
        .lte('issueDate', `${year}-12-31`);

      if (error) {
        console.error("Error fetching invoices:", error);
        setIsLoading(false);
        return;
      }

      const monthly = Array(12).fill(0);
      let total = 0;
      let days = 0;

      data.forEach(inv => {
        const month = new Date(inv.issueDate).getMonth();
        const value = parseFloat(inv.total || 0);
        const delay = inv.paymentDate ?
          (new Date(inv.paymentDate).getTime() - new Date(inv.issueDate).getTime()) / (1000 * 3600 * 24) : 0;
        monthly[month] += value;
        total += value;
        days += delay;
      });

      setRevenueChart(monthly);
      setTotalRevenue(total);
      setAverageInvoice(data.length > 0 ? total / data.length : 0);
      setPaymentTime(data.length > 0 ? Math.round(days / data.length) : 0);
      setIsLoading(false);
    };

    fetchRevenue();
  }, [year, timeframe, isPro]);

  if (!isPro) {
    return (
      <DashboardLayout>
        <div className="p-6 text-center">
          <h2 className="text-2xl font-semibold mb-2">Upgrade to Pro</h2>
          <p className="text-gray-600 mb-4">
            Reports and analytics are available only to Pro users.
          </p>
          <Button onClick={() => window.location.href = "/pricing"}>
            Upgrade Now
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Financial Reports</h1>
            <p className="text-muted-foreground">Analyze your business performance and trends</p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" className="gap-2">
              <FileDown className="h-4 w-4" /> Export Reports
            </Button>
          </div>
        </div>

        <Tabs defaultValue="revenue" className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <TabsList>
              <TabsTrigger value="revenue">Revenue Analysis</TabsTrigger>
              <TabsTrigger value="expenses">Expense Analysis</TabsTrigger>
              <TabsTrigger value="clients">Client Insights</TabsTrigger>
            </TabsList>
            <div className="flex gap-3">
              <Select value={timeframe} onValueChange={setTimeframe}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Select timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="year">Monthly</SelectItem>
                  <SelectItem value="quarter">Quarterly</SelectItem>
                  <SelectItem value="week">Weekly</SelectItem>
                </SelectContent>
              </Select>
              <Select value={year.toString()} onValueChange={(value) => setYear(parseInt(value))}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={(year - 2).toString()}>{year - 2}</SelectItem>
                  <SelectItem value={(year - 1).toString()}>{year - 1}</SelectItem>
                  <SelectItem value={year.toString()}>{year}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <TabsContent value="revenue" className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <RevenueCard 
                title="Total Revenue" 
                value={`₹${totalRevenue}`} 
                trend={0} 
                increasingIsGood={true}
              />
              <RevenueCard 
                title="Average Invoice" 
                value={`₹${averageInvoice.toFixed(0)}`} 
                trend={0} 
                increasingIsGood={true}
              />
              <RevenueCard 
                title="Payment Time" 
                value={`${paymentTime} days`} 
                trend={0} 
                increasingIsGood={false}
              />
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
                <CardDescription>
                  {timeframe === "year" 
                    ? "Monthly revenue breakdown for the selected year" 
                    : timeframe === "quarter" 
                      ? "Quarterly revenue breakdown for the selected year"
                      : "Weekly revenue breakdown"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  {isLoading ? (
                    <div className="h-full flex items-center justify-center">
                      <p>Loading chart data...</p>
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={revenueChart.map((value, index) => ({ month: index + 1, value }))}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis tickFormatter={(v) => `₹${v}`} />
                        <Tooltip formatter={(v: any) => `₹${v}`} />
                        <Bar dataKey="value" />
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

interface RevenueCardProps {
  title: string;
  value: string;
  trend: number;
  increasingIsGood: boolean;
  hideIndicator?: boolean;
}

const RevenueCard = ({ title, value, trend, increasingIsGood, hideIndicator = false }: RevenueCardProps) => {
  const isPositive = trend > 0;
  const isGood = isPositive === increasingIsGood;

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col space-y-2">
          <span className="text-sm text-muted-foreground">{title}</span>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold">{value}</span>
            {!hideIndicator && trend !== 0 && (
              <div className={`flex items-center ${isGood ? 'text-green-600' : 'text-red-600'}`}>
                {isPositive ? (
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 mr-1" />
                )}
                <span className="text-sm font-medium">{Math.abs(trend)}%</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Reports;
