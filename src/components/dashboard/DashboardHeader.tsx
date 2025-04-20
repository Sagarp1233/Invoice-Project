import { Link } from "react-router-dom";
import { FilePlus, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";
import { useUserPlan } from "@/hooks/useUserPlan";
import PlanBadge from "@/components/common/PlanBadge";
import { supabase } from "@/integrations/supabase/client";

type Currency = 'INR' | 'USD' | 'EUR' | 'GBP' | 'JPY' | 'CHF' | 'RUB';

interface DashboardHeaderProps {
  userName: string;
  isLoading: boolean;
  savedInvoices: any[];
  currency: Currency;
  handleCurrencyChange: (value: string) => void;
}

const DashboardHeader = ({ 
  userName, 
  isLoading, 
  savedInvoices, 
  currency, 
  handleCurrencyChange 
}: DashboardHeaderProps) => {
  const [displayName, setDisplayName] = useState(userName);
  const { userPlan } = useUserPlan();

  // Get a better user name from various sources
  useEffect(() => {
    const getUserNameFromStorage = () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          
          // Try different properties to find a suitable name
          const name = userData.name || 
                      userData.user_metadata?.full_name || 
                      userData.raw_user_metadata?.full_name ||
                      (userData.email ? userData.email.split('@')[0] : null) ||
                      userName;
                      
          setDisplayName(name);
        } else {
          setDisplayName(userName);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setDisplayName(userName);
      }
    };

    // From Supabase session
    const getSupabaseUserName = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
         // const name = user.user_metadata?.full_name || 
          const name = user.user_metadata?.name || 
	  //user.raw_user_meta_data?.name?.trim() ||
                     (user.email ? user.email.split('@')[0] : null) ||
                     userName;
          
          setDisplayName(name);
        }
      } catch (error) {
        console.error("Error fetching Supabase user:", error);
      }
    };

    getUserNameFromStorage();
    getSupabaseUserName();
    
    // Listen for storage changes (if user is updated in another tab)
    window.addEventListener('storage', getUserNameFromStorage);
    
    return () => {
      window.removeEventListener('storage', getUserNameFromStorage);
    };
  }, [userName]);

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        {isLoading ? (
          <div className="animate-pulse">
            <div className="h-8 w-48 bg-gray-200 rounded mb-2"></div>
            <div className="h-5 w-64 bg-gray-200 rounded"></div>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                <User className="h-6 w-6 text-invoice-purple mr-2" />
                <h1 className="text-3xl font-bold">Welcome, {displayName}!</h1>
              </div>
              <PlanBadge plan={userPlan} />
            </div>
            <p className="text-muted-foreground">
              {savedInvoices.length > 0 
                ? "Manage your invoices and track your finances" 
                : "Get started by creating your first invoice"}
            </p>
          </>
        )}
      </div>
      <div className="flex items-center gap-3">
        {userPlan === 'free' && (
          <Link to="/pricing">
            <Button variant="outline" className="border-invoice-purple text-invoice-purple hover:bg-invoice-purple/10">
              Upgrade Plan
            </Button>
          </Link>
        )}
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">Currency:</span>
          <Select defaultValue={currency} onValueChange={handleCurrencyChange}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Select currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="USD">USD ($)</SelectItem>
              <SelectItem value="INR">INR (₹)</SelectItem>
              <SelectItem value="EUR">EUR (€)</SelectItem>
              <SelectItem value="GBP">GBP (£)</SelectItem>
              <SelectItem value="JPY">JPY (¥)</SelectItem>
              <SelectItem value="CHF">CHF (Fr)</SelectItem>
              <SelectItem value="RUB">RUB (₽)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button className="bg-invoice-purple hover:bg-invoice-darkPurple" asChild>
          <Link to="/create-invoice">
            <FilePlus className="mr-2 h-4 w-4" /> Create Invoice
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
