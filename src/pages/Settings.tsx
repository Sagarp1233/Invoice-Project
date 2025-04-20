import React from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUserSettings } from "@/components/settings/useUserSettings";
import ProfileSettingsCard from "@/components/settings/ProfileSettingsCard";
import RegionalSettingsCard from "@/components/settings/RegionalSettingsCard";
import InvoiceDefaultsCard from "@/components/settings/InvoiceDefaultsCard";

const Settings = () => {
  const { userSettings, handleSettingChange, handleSaveSettings } = useUserSettings();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>

        <Tabs defaultValue="profile">
          <TabsList className="grid grid-cols-3 max-w-md">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="invoice">Invoice Defaults</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6 mt-6">
            <ProfileSettingsCard
              name={userSettings.name}
              email={userSettings.email}
              company={userSettings.company}
              onSettingChange={handleSettingChange}
              onSave={handleSaveSettings}
            />
          </TabsContent>

          <TabsContent value="preferences" className="space-y-6 mt-6">
            <RegionalSettingsCard
              country={userSettings.country}
              defaultCurrency={userSettings.defaultCurrency}
              dateFormat={userSettings.dateFormat}
              onSettingChange={handleSettingChange}
              onSave={handleSaveSettings}
            />
          </TabsContent>

          <TabsContent value="invoice" className="space-y-6 mt-6">
            <InvoiceDefaultsCard
              defaultTaxRate={userSettings.defaultTaxRate}
              defaultPaymentTerms={userSettings.defaultPaymentTerms}
              onSettingChange={handleSettingChange}
              onSave={handleSaveSettings}
            />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
