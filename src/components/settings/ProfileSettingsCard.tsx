
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ProfileSettingsProps {
  name: string;
  email: string;
  company: string;
  onSettingChange: (field: string, value: string) => void;
  onSave: () => void;
}

const ProfileSettingsCard: React.FC<ProfileSettingsProps> = ({
  name,
  email,
  company,
  onSettingChange,
  onSave
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>
          Update your personal and business information
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input 
              id="name" 
              value={name} 
              onChange={(e) => onSettingChange('name', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input 
              id="email" 
              type="email" 
              value={email} 
              onChange={(e) => onSettingChange('email', e.target.value)}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="company">Company Name</Label>
          <Input 
            id="company" 
            value={company} 
            onChange={(e) => onSettingChange('company', e.target.value)}
          />
        </div>
        <Button onClick={onSave} className="bg-invoice-purple hover:bg-invoice-darkPurple">
          Save Changes
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProfileSettingsCard;
