
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useNavAuth } from "@/hooks/useNavAuth";
import NavbarDesktopMenu from "./NavbarDesktopMenu";
import NavbarMobileMenu from "./NavbarMobileMenu";
import Logo from "@/components/common/Logo";

interface NavbarProps {
  isLoggedIn?: boolean;
}

const Navbar = ({ isLoggedIn: isLoggedInProp = false }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { userData, isLoggedIn, handleLogout } = useNavAuth(isLoggedInProp);

  // Handle navigation
  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const handleLogoutAndRedirect = () => {
    handleLogout();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Logo />
          </div>

          {/* Desktop menu */}
          <NavbarDesktopMenu 
            isLoggedIn={isLoggedIn}
            userData={userData}
            onLogout={handleLogoutAndRedirect}
            onNavigate={handleNavigation}
          />

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:text-gray-900 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <NavbarMobileMenu
        isOpen={isMenuOpen}
        isLoggedIn={isLoggedIn}
        userData={userData}
        onNavigate={handleNavigation}
        onClose={() => setIsMenuOpen(false)}
        onLogout={handleLogoutAndRedirect}
      />
    </nav>
  );
};

export default Navbar;
