
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

interface CompanyInfoFormProps {
  companyInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    website: string;
    logo: string | null;
    logoUrl?: string;
  };
  onChange: (field: string, value: string | null) => void;
}

const CompanyInfoForm: React.FC<CompanyInfoFormProps> = ({ companyInfo, onChange }) => {
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would upload the file to a server and get a URL back
      // For this demo, we'll use a local URL
      const reader = new FileReader();
      reader.onload = () => {
        onChange("logo", reader.result as string);
        // Also update logoUrl for consistency
        onChange("logoUrl", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <Label className="mb-2 block">Company Logo</Label>
        <div className="flex items-center gap-4">
          {companyInfo.logo ? (
            <div className="relative h-20 w-20 overflow-hidden rounded-lg border">
              <img
                src={companyInfo.logo}
                alt="Company Logo"
                className="h-full w-full object-contain"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-6 w-6 rounded-full bg-foreground/80 p-1 text-background"
                onClick={() => {
                  onChange("logo", null);
                  onChange("logoUrl", "");
                }}
              >
                ✕
              </Button>
            </div>
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-lg border border-dashed">
              <Upload className="h-6 w-6 text-muted-foreground" />
            </div>
          )}
          <div>
            <Input
              id="logoUpload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleLogoUpload}
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => document.getElementById("logoUpload")?.click()}
            >
              {companyInfo.logo ? "Change Logo" : "Upload Logo"}
            </Button>
            <p className="mt-1 text-xs text-muted-foreground">
              Recommended: 200x200px JPG, PNG
            </p>
          </div>
        </div>
      </div>

      <div>
        <Label htmlFor="companyName">Company Name</Label>
        <Input
          id="companyName"
          value={companyInfo.name}
          onChange={(e) => onChange("name", e.target.value)}
          placeholder="Your Company Name"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="companyEmail">Email</Label>
          <Input
            id="companyEmail"
            type="email"
            value={companyInfo.email}
            onChange={(e) => onChange("email", e.target.value)}
            placeholder="company@example.com"
          />
        </div>
        <div>
          <Label htmlFor="companyPhone">Phone</Label>
          <Input
            id="companyPhone"
            value={companyInfo.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            placeholder="+1 (123) 456-7890"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="companyAddress">Address</Label>
        <Textarea
          id="companyAddress"
          value={companyInfo.address}
          onChange={(e) => onChange("address", e.target.value)}
          placeholder="Company Address"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="companyCity">City</Label>
          <Input
            id="companyCity"
            value={companyInfo.city}
            onChange={(e) => onChange("city", e.target.value)}
            placeholder="City"
          />
        </div>
        <div>
          <Label htmlFor="companyState">State/Province</Label>
          <Input
            id="companyState"
            value={companyInfo.state}
            onChange={(e) => onChange("state", e.target.value)}
            placeholder="State/Province"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="companyZip">Zip/Postal Code</Label>
          <Input
            id="companyZip"
            value={companyInfo.zip}
            onChange={(e) => onChange("zip", e.target.value)}
            placeholder="Zip/Postal Code"
          />
        </div>
        <div>
          <Label htmlFor="companyCountry">Country</Label>
          <Input
            id="companyCountry"
            value={companyInfo.country}
            onChange={(e) => onChange("country", e.target.value)}
            placeholder="Country"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="companyWebsite">Website</Label>
        <Input
          id="companyWebsite"
          value={companyInfo.website}
          onChange={(e) => onChange("website", e.target.value)}
          placeholder="https://example.com"
        />
      </div>
    </div>
  );
};

export default CompanyInfoForm;
