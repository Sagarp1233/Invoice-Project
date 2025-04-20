
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, LogOut, ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { MenuItem, getDashboardMenuItems } from './menuItems';
import Logo from '@/components/common/Logo';
import UserInfo from '@/components/common/UserInfo';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  menuItems: MenuItem[];
  onLogout: () => void;
  user: any;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ 
  isOpen, 
  onClose, 
  menuItems,
  onLogout,
  user
}) => {
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  console.log("Mobile Menu - Current location:", location.pathname); // Debug logging

  if (!isOpen) return null;

  return (
    <div className="lg:hidden fixed inset-0 z-50 flex">
      <div className="fixed inset-0 bg-black/50" onClick={onClose}></div>
      <div className="relative flex flex-col w-80 max-w-[80%] h-full bg-white">
        <div className="p-4 flex items-center justify-between">
          <Logo />
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        <Separator />
        <div className="p-4 space-y-2 flex-1 overflow-y-auto">
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
                      <span className="font-medium">{item.name}</span>
                    </div>
                    {openDropdown === item.name ? 
                      <ChevronDown className="h-4 w-4" /> : 
                      <ChevronRight className="h-4 w-4" />
                    }
                  </button>
                  {openDropdown === item.name && item.dropdownItems && (
                    <div className="pl-10 mt-2 space-y-1">
                      {item.dropdownItems.map((subItem) => (
                        <Link
                          key={subItem.name}
                          to={subItem.path}
                          className={cn(
                            "flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors",
                            isActive(subItem.path) ? "bg-slate-100 text-invoice-purple" : "hover:bg-slate-100 hover:text-invoice-purple"
                          )}
                          onClick={onClose}
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
                  onClick={onClose}
                >
                  {React.createElement(item.icon, { className: "h-5 w-5" })}
                  <span className="font-medium">{item.name}</span>
                </Link>
              )}
            </div>
          ))}
        </div>
        <div className="p-4">
          {user && (
            <>
              <div className="mb-4 px-3 py-2">
                <p className="font-medium">{user.name || 'User'}</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
              <Separator className="mb-4" />
            </>
          )}
          <Button 
            variant="ghost" 
            className="flex w-full items-center gap-3 justify-start text-red-500 hover:text-red-700 hover:bg-red-50"
            onClick={onLogout}
          >
            <LogOut className="h-5 w-5" />
            <span className="font-medium">Logout</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
