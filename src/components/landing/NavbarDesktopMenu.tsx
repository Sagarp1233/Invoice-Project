
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import NavbarUserMenu from "./NavbarUserMenu";

interface NavbarDesktopMenuProps {
  isLoggedIn: boolean;
  userData: any;
  onLogout: () => void;
  onNavigate: (path: string) => void;
}

const NavbarDesktopMenu = ({
  isLoggedIn,
  userData,
  onLogout,
  onNavigate
}: NavbarDesktopMenuProps) => {
  return (
    <div className="hidden md:flex md:items-center md:space-x-6">
      <Link
        to="/"
        className="text-sm font-medium text-gray-700 hover:text-invoice-purple"
      >
        Home
      </Link>
  
      <Link
        to={isLoggedIn ? "/pricing" : "/#pricing"}
        className="text-sm font-medium text-gray-700 hover:text-invoice-purple"
      >
        Pricing
      </Link>
	   
 
      {isLoggedIn && userData ? (
        <NavbarUserMenu 
          userData={userData} 
          onLogout={onLogout} 
          onNavigate={onNavigate} 
        />
      ) : (
        <div className="flex items-center space-x-3">
          <Link to="/auth/login">
            <Button variant="outline" className="border-invoice-purple text-invoice-purple">
              Log in
            </Button>
          </Link>
          <Link to="/auth/register">
            <Button className="bg-invoice-purple hover:bg-invoice-darkPurple">Sign up</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default NavbarDesktopMenu;
