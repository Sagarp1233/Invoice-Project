
import { useEffect, Dispatch, SetStateAction } from "react";
import { getCurrencyForCountry } from "@/utils/locationData";

interface CurrencyProps {
  clientCountry: string;
  setCurrency: Dispatch<SetStateAction<string>>;
}

export const useInvoiceCurrency = ({ clientCountry, setCurrency }: CurrencyProps) => {
  // Get user's default currency from settings
  const getUserDefaultCurrency = (): string => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        // First check in settings object, then fall back to top-level property
        const defaultCurrency = userData.settings?.defaultCurrency || userData.defaultCurrency || "INR";
        console.log("Retrieved user default currency:", defaultCurrency);
        return defaultCurrency;
      }
    } catch (error) {
      console.error("Error getting user default currency:", error);
    }
    return "INR"; // Default to INR
  };

  // First set the default from user settings
  useEffect(() => {
    const defaultCurrency = getUserDefaultCurrency();
    if (defaultCurrency) {
      setCurrency(defaultCurrency);
      console.log("Setting default currency from user settings:", defaultCurrency);
    }
  }, [setCurrency]);

  // Then auto-detect client country and set currency if different
  useEffect(() => {
    if (clientCountry && clientCountry.trim() !== "") {
      const detectedCurrency = getCurrencyForCountry(clientCountry);
      if (detectedCurrency) {
        console.log("Setting currency based on client country:", clientCountry, detectedCurrency);
        setCurrency(detectedCurrency);
      }
    }
  }, [clientCountry, setCurrency]);
  
  // Set up a listener for changes in user settings
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'user') {
        const defaultCurrency = getUserDefaultCurrency();
        setCurrency(defaultCurrency);
        console.log("User settings changed, updating currency to:", defaultCurrency);
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [setCurrency]);
};
