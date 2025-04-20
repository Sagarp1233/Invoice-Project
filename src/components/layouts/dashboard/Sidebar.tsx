
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LogOut, X, ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { MenuItem, getDashboardMenuItems } from './menuItems';
import Logo from '@/components/common/Logo';
import UserInfo from '@/components/common/UserInfo';
import PlanBadge from '@/components/common/PlanBadge';
import { useUserPlan } from '@/hooks/useUserPlan';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  onLogout: () => void;
  user: any;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  sidebarOpen, 
  setSidebarOpen,
  onLogout,
  user
}) => {
  const location = useLocation();
  const menuItems = getDashboardMenuItems();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { userPlan } = useUserPlan();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <div className="h-full flex flex-col justify-between">
      <div>
        <div className={cn("p-4 flex items-center", !sidebarOpen && "justify-center")}>
          {sidebarOpen ? <Logo /> : <Logo variant="small" />}
          <Button
            variant="ghost"
            size="icon"
            className={cn("ml-auto", !sidebarOpen && "hidden")}
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        <Separator />
        <div className="p-4 space-y-2">
          {menuItems.map((item) => (
            <div key={item.name} className="menu-item">
              {item.dropdown ? (
                <div>
                  <button
                    onClick={() => toggleDropdown(item.name)}
                    className={cn(
                      "flex items-center justify-between w-full gap-3 px-3 py-2 rounded-md transition-colors", 
                      isActive(item.path) ? "bg-slate-100 text-invoice-purple" : "hover:bg-slate-100 hover:text-invoice-purple"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      {React.createElement(item.icon, { className: "h-5 w-5" })}
                      <span className={cn("font-medium", !sidebarOpen && "hidden")}>{item.name}</span>
                    </div>
                    {sidebarOpen && (
                      openDropdown === item.name ? 
                        <ChevronDown className="h-4 w-4" /> : 
                        <ChevronRight className="h-4 w-4" />
                    )}
                  </button>
                  {openDropdown === item.name && sidebarOpen && item.dropdownItems && (
                    <div className="pl-10 mt-2 space-y-1">
                      {item.dropdownItems.map((subItem) => (
                        <Link
                          key={subItem.name}
                          to={subItem.path}
                          className={cn(
                            "flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors",
                            isActive(subItem.path) ? "bg-slate-100 text-invoice-purple" : "hover:bg-slate-100 hover:text-invoice-purple"
                          )}
                        >
                          {React.createElement(subItem.icon, { className: "h-4 w-4" })}
                          <span>{subItem.name}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md transition-colors", 
                    isActive(item.path) ? "bg-slate-100 text-invoice-purple" : "hover:bg-slate-100 hover:text-invoice-purple"
                  )}
                >
                  {React.createElement(item.icon, { className: "h-5 w-5" })}
                  <span className={cn("font-medium", !sidebarOpen && "hidden")}>{item.name}</span>
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="p-4">
        {sidebarOpen && user && (
          <div className="mb-4 space-y-2">
            <UserInfo userData={user} onLogout={onLogout} />
            <div className="flex justify-between items-center px-3 py-2">
              <PlanBadge plan={userPlan} />
              
              {userPlan === 'free' && (
                <Link to="/pricing">
                  <Button size="sm" variant="outline" className="text-invoice-purple border-invoice-purple hover:bg-invoice-purple/10">
                    Upgrade
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
        {!sidebarOpen && (
          <Button 
            variant="ghost" 
            className="flex w-full items-center gap-3 justify-start text-red-500 hover:text-red-700 hover:bg-red-50"
            onClick={onLogout}
          >
            <LogOut className="h-5 w-5" />
            <span className={cn("font-medium", !sidebarOpen && "hidden")}>Logout</span>
          </Button>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
