
import { useEffect } from "react";
import { getCurrencyForCountry } from "@/utils/locationData";

interface CurrencyDetectionProps {
  country: string;
  onChange: (field: string, value: string) => void;
}

export const useCurrencyDetection = ({ country, onChange }: CurrencyDetectionProps) => {
  // Auto-update currency based on country
  useEffect(() => {
    if (country) {
      const countryCurrency = getCurrencyForCountry(country);
      // Use a special field for passing currency to parent components
      onChange('currency', countryCurrency);
    }
  }, [country, onChange]);
};
