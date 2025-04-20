
import React from 'react';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { useDashboardLayout } from '@/hooks/useDashboardLayout';
import Sidebar from './dashboard/Sidebar';
import MobileMenu from './dashboard/MobileMenu';
import MobileHeader from './dashboard/MobileHeader';
import { getDashboardMenuItems } from './dashboard/menuItems';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const {
    sidebarOpen,
    setSidebarOpen,
    isMobile,
    mobileMenuOpen,
    setMobileMenuOpen,
    user,
    handleLogout
  } = useDashboardLayout();

  const menuItems = getDashboardMenuItems();

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar for desktop */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen transition-all duration-300 ease-in-out bg-white border-r border-slate-200",
          sidebarOpen ? "w-64" : "w-[70px]",
          isMobile && "hidden"
        )}
      >
        <Sidebar 
          sidebarOpen={sidebarOpen} 
          setSidebarOpen={setSidebarOpen}
          onLogout={handleLogout}
          user={user}
        />
      </aside>

      {/* Mobile menu */}
      <MobileMenu 
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        menuItems={menuItems}
        onLogout={handleLogout}
        user={user}
      />

      {/* Main content */}
      <div className={cn(
        "flex-1 transition-all duration-300 ease-in-out",
        sidebarOpen ? "lg:ml-64" : "lg:ml-[70px]",
      )}>
        {/* Mobile header */}
        <MobileHeader 
          onMenuOpen={() => setMobileMenuOpen(true)}
          user={user}
        />

        {/* Collapsed sidebar button for desktop */}
        {!sidebarOpen && !isMobile && (
          <Button
            variant="ghost"
            size="icon"
            className="fixed left-5 top-5 z-50"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        )}

        <main className="p-4 md:p-6 max-w-7xl mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
