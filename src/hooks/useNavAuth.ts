
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export function useNavAuth(isLoggedInProp = false) {
  const [userData, setUserData] = useState<any>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(isLoggedInProp);
  const location = useLocation();
  const { toast } = useToast();

  // Get user data from localStorage
  useEffect(() => {
    const checkAuth = () => {
      try {
        const user = localStorage.getItem('user');
        if (user) {
          setUserData(JSON.parse(user));
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
          setUserData(null);
        }
      } catch (e) {
        console.error("Error parsing user data:", e);
        setIsLoggedIn(false);
        setUserData(null);
      }
    };

    checkAuth();
    
    // Listen for storage events (login/logout in other tabs)
    window.addEventListener('storage', checkAuth);
    
    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUserData(null);
    
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully."
    });
  };

  return { userData, isLoggedIn, handleLogout };
}
