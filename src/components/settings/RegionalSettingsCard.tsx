
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { countries } from "@/utils/locationData";

interface RegionalSettingsProps {
  country: string;
  defaultCurrency: string;
  dateFormat: string;
  onSettingChange: (field: string, value: string) => void;
  onSave: () => void;
}

const RegionalSettingsCard: React.FC<RegionalSettingsProps> = ({
  country,
  defaultCurrency,
  dateFormat,
  onSettingChange,
  onSave
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Regional Settings</CardTitle>
        <CardDescription>
          Set your country and currency preferences
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Select
              value={country}
              onValueChange={(value) => onSettingChange('country', value)}
            >
              <SelectTrigger id="country">
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country.code} value={country.code}>
                    {country.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="currency">Default Currency</Label>
            <Select
              value={defaultCurrency}
              onValueChange={(value) => onSettingChange('defaultCurrency', value)}
            >
              <SelectTrigger id="currency">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">US Dollar (USD)</SelectItem>
                <SelectItem value="INR">Indian Rupee (INR)</SelectItem>
                <SelectItem value="EUR">Euro (EUR)</SelectItem>
                <SelectItem value="GBP">British Pound (GBP)</SelectItem>
                <SelectItem value="JPY">Japanese Yen (JPY)</SelectItem>
                <SelectItem value="CHF">Swiss Franc (CHF)</SelectItem>
                <SelectItem value="RUB">Russian Ruble (RUB)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="dateFormat">Date Format</Label>
          <Select
            value={dateFormat}
            onValueChange={(value) => onSettingChange('dateFormat', value)}
          >
            <SelectTrigger id="dateFormat">
              <SelectValue placeholder="Select date format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="MMM d, yyyy">Apr 12, 2025</SelectItem>
              <SelectItem value="d MMM yyyy">12 Apr 2025</SelectItem>
              <SelectItem value="yyyy-MM-dd">2025-04-12</SelectItem>
              <SelectItem value="dd/MM/yyyy">12/04/2025</SelectItem>
              <SelectItem value="MM/dd/yyyy">04/12/2025</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={onSave} className="bg-invoice-purple hover:bg-invoice-darkPurple">
          Save Preferences
        </Button>
      </CardContent>
    </Card>
  );
};

export default RegionalSettingsCard;
