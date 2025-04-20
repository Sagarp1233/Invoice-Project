
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

interface NavbarMobileMenuProps {
  isOpen: boolean;
  isLoggedIn: boolean;
  userData: any;
  onNavigate: (path: string) => void;
  onClose: () => void;
  onLogout: () => void;
}

const NavbarMobileMenu = ({
  isOpen,
  isLoggedIn,
  userData,
  onNavigate,
  onClose,
  onLogout
}: NavbarMobileMenuProps) => {
  if (!isOpen) return null;

  const handleLogoutClick = () => {
    onLogout();
    onClose();
  };

  return (
    <div className="md:hidden">
      <div className="space-y-1 px-4 pb-4 pt-2">
        <Link
          to="/"
          className="block py-2 text-base font-medium text-gray-700 hover:text-invoice-purple"
          onClick={onClose}
        >
          Home
        </Link>
        <Link
          to="/features"
          className="block py-2 text-base font-medium text-gray-700 hover:text-invoice-purple"
          onClick={onClose}
        >
          Features
        </Link>
        <Link
          to={isLoggedIn ? "/pricing" : "/#pricing"}
          className="block py-2 text-base font-medium text-gray-700 hover:text-invoice-purple"
          onClick={onClose}
        >
          Pricing
        </Link>
        <Link
          to={isLoggedIn ? "/invoice-templates" : "/templates"}
          className="block py-2 text-base font-medium text-gray-700 hover:text-invoice-purple"
          onClick={onClose}
        >
          Templates
        </Link>

        {isLoggedIn && userData ? (
          <div className="mt-4 space-y-2 border-t pt-4">
            <p className="font-medium">{userData.name}</p>
            <p className="text-sm text-gray-500">{userData.email}</p>
            <button
              onClick={() => onNavigate('/dashboard')}
              className="block w-full text-left py-2 text-base font-medium text-gray-700 hover:text-invoice-purple"
            >
              Dashboard
            </button>
            <button
              onClick={() => onNavigate('/invoice/create')}
              className="block w-full text-left py-2 text-base font-medium text-gray-700 hover:text-invoice-purple"
            >
              Create Invoice
            </button>
            <button
              onClick={() => onNavigate('/invoice-templates')}
              className="block w-full text-left py-2 text-base font-medium text-gray-700 hover:text-invoice-purple"
            >
              Invoice Templates
            </button>
            <button
              onClick={() => onNavigate('/pricing')}
              className="block w-full text-left py-2 text-base font-medium text-gray-700 hover:text-invoice-purple"
            >
              Pricing
            </button>
            <button
              onClick={handleLogoutClick}
              className="mt-2 flex w-full items-center py-2 text-base font-medium text-red-500"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </button>
          </div>
        ) : (
          <div className="mt-4 space-y-3 border-t pt-4">
            <Link to="/auth/login" onClick={onClose}>
              <Button
                variant="outline"
                className="w-full border-invoice-purple text-invoice-purple"
              >
                Log in
              </Button>
            </Link>
            <Link to="/auth/register" onClick={onClose}>
              <Button className="w-full bg-invoice-purple hover:bg-invoice-darkPurple">
                Sign up
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavbarMobileMenu;
