
import { useState, useEffect } from "react";
import { getNextInvoiceNumber } from "@/components/dashboard/CurrencyUtils";

export const useInvoiceState = () => {
  // Get user's default currency
  const getUserDefaultCurrency = (): string => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        const defaultCurrency = userData.settings?.defaultCurrency || userData.defaultCurrency || "INR";
        console.log("User default currency from storage:", defaultCurrency);
        return defaultCurrency;
      }
    } catch (error) {
      console.error("Error getting user default currency:", error);
    }
    return "INR"; // Default to INR instead of USD
  };

  // Basic invoice details
  const [invoiceNumber, setInvoiceNumber] = useState<string>("");
  const [invoiceNumberError, setInvoiceNumberError] = useState("");
  const [issueDate, setIssueDate] = useState<Date>(new Date());
  const [dueDate, setDueDate] = useState<Date>(() => {
    const date = new Date();
    date.setDate(date.getDate() + 30); // Due in 30 days by default
    return date;
  });

  // Company information
  const [companyInfo, setCompanyInfo] = useState({
    name: "Your Company Name",
    email: "company@example.com",
    phone: "+91 123 456 7890", // Changed to India phone format
    address: "123 Business St, Building A\nNew Delhi, Delhi 110001",
    city: "New Delhi",
    state: "Delhi",
    zip: "110001",
    country: "IN", // India as default
    website: "https://yourcompany.com",
    logo: null,
    logoUrl: "",
  });
  
  // Client information
  const [clientInfo, setClientInfo] = useState({
    name: "Client Name",
    email: "client@example.com",
    address: "456 Client Ave",
    city: "Mumbai",
    state: "Maharashtra",
    zip: "400001",
    country: "IN", // India as default
    type: "business", // Added client type
  });

  // Currency and pricing information
  const [invoiceCurrency, setInvoiceCurrency] = useState<string>("");
  const [taxRate, setTaxRate] = useState(18); // Default GST rate in India
  const [notes, setNotes] = useState("Thank you for your business!");
  const [directAmount, setDirectAmount] = useState<number | null>(null);
  
  // Template and edit mode
  const [isEditMode, setIsEditMode] = useState(false);
  const [templateId, setTemplateId] = useState<string | null>(null);

  // Initialize currency from user settings on component mount
  useEffect(() => {
    const currency = getUserDefaultCurrency();
    console.log("Setting initial currency:", currency);
    setInvoiceCurrency(currency);
  }, []);

  // Update currency if user settings change
  useEffect(() => {
    const handleStorageChange = () => {
      const newCurrency = getUserDefaultCurrency();
      console.log("Storage changed, updating currency to:", newCurrency);
      setInvoiceCurrency(newCurrency);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return {
    // Basic invoice details
    invoiceNumber,
    setInvoiceNumber,
    invoiceNumberError,
    setInvoiceNumberError,
    issueDate,
    setIssueDate,
    dueDate,
    setDueDate,
    
    // Company information
    companyInfo,
    setCompanyInfo,
    
    // Client information
    clientInfo,
    setClientInfo,
    
    // Currency and pricing information
    invoiceCurrency,
    setInvoiceCurrency,
    taxRate,
    setTaxRate,
    notes,
    setNotes,
    directAmount,
    setDirectAmount,
    
    // Template and edit mode
    isEditMode,
    setIsEditMode,
    templateId,
    setTemplateId,
  };
};
