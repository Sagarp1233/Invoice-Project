import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface UserSettings {
  name: string;
  email: string;
  company: string;
  country: string;
  defaultCurrency: string;
  dateFormat: string;
  defaultTaxRate: number;
  defaultPaymentTerms: number;
}

export const useUserSettings = () => {
  const { toast } = useToast();

  const [userSettings, setUserSettings] = useState<UserSettings>({
    name: "",
    email: "",
    company: "",
    country: "IN",
    defaultCurrency: "INR",
    dateFormat: "MMM d, yyyy",
    defaultTaxRate: 18,
    defaultPaymentTerms: 30,
  });

  // Load settings from localStorage on component mount
 useEffect(() => {
  let storedUser = localStorage.getItem("user");
  if (!storedUser) {
    // Fallback for development - inject a dummy user
    const dummyUser = {
      id: "u1",
      name: "Demo User",
      email: "demo@invoice.com",
      company: "Demo Corp",
      settings: {
        country: "IN",
        defaultCurrency: "INR",
        dateFormat: "MMM d, yyyy",
        defaultTaxRate: 18,
        defaultPaymentTerms: 30,
      },
    };
    localStorage.setItem("user", JSON.stringify(dummyUser));
    storedUser = JSON.stringify(dummyUser);
  }

  try {
    const userData = JSON.parse(storedUser);
    setUserSettings((prev) => ({
      ...prev,
      name: userData.name || "",
      email: userData.email || "",
      company: userData.company || "",
      country: userData.settings?.country || "IN",
      defaultCurrency: userData.settings?.defaultCurrency || "INR",
      dateFormat: userData.settings?.dateFormat || "MMM d, yyyy",
      defaultTaxRate: userData.settings?.defaultTaxRate ?? 18,
      defaultPaymentTerms: userData.settings?.defaultPaymentTerms ?? 30,
    }));
  } catch (error) {
    console.error("Error loading user settings:", error);
  }
}, []);


  // Handle individual setting changes
  const handleSettingChange = (field: keyof UserSettings, value: any) => {
    setUserSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Save updated settings back to localStorage
  const handleSaveSettings = () => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      toast({
        title: "Error",
        description: "User not found. Please login again.",
        variant: "destructive",
      });
      return;
    }

    try {
      let userData = JSON.parse(storedUser);

      userData.settings = {
        ...(userData.settings || {}),
        country: userSettings.country,
        defaultCurrency: userSettings.defaultCurrency,
        dateFormat: userSettings.dateFormat,
        defaultTaxRate: userSettings.defaultTaxRate,
        defaultPaymentTerms: userSettings.defaultPaymentTerms,
      };

      userData = {
        ...userData,
        name: userSettings.name,
        email: userSettings.email,
        company: userSettings.company,
        updatedAt: new Date().toISOString(),
      };

      localStorage.setItem("user", JSON.stringify(userData));

      // Also update the entry in the users array
      const usersJson = localStorage.getItem("users");
      if (usersJson) {
        const users = JSON.parse(usersJson);
        const updatedUsers = users.map((user: any) => {
          if (user.id === userData.id) {
            return {
              ...user,
              name: userSettings.name,
              email: userSettings.email,
              company: userSettings.company,
              settings: userData.settings,
              updatedAt: new Date().toISOString(),
            };
          }
          return user;
        });

        localStorage.setItem("users", JSON.stringify(updatedUsers));
      }

      toast({
        title: "Settings Saved",
        description: "Your settings have been updated successfully.",
      });
    } catch (error) {
      console.error("Error saving user settings:", error);
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "destructive",
      });
    }
  };

  return {
    userSettings,
    handleSettingChange,
    handleSaveSettings,
  };
};
