
import { Link } from "react-router-dom";
import { BarChart3, FilePlus } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const EmptyRevenueChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue Overview</CardTitle>
        <CardDescription>Your invoice revenue will appear here</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] flex flex-col items-center justify-center text-muted-foreground">
          <BarChart3 className="h-16 w-16 mb-4 text-muted-foreground/50" />
          <p className="text-lg font-medium">No Revenue Data Yet</p>
          <p className="text-sm max-w-md text-center mt-2">
            Start creating and sending invoices to see your revenue data visualized here
          </p>
          <Button className="mt-6 bg-invoice-purple hover:bg-invoice-darkPurple" asChild>
            <Link to="/create-invoice">
              <FilePlus className="mr-2 h-4 w-4" /> Create Your First Invoice
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmptyRevenueChart;
