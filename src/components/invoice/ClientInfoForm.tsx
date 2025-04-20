import { useEffect } from "react";
import ClientTypeSelect from "./client/ClientTypeSelect";
import ClientStatusSelect from "./client/ClientStatusSelect";
import ClientBasicInfo from "./client/ClientBasicInfo";
import ClientAddress from "./client/ClientAddress";
import ClientLocationPicker from "./client/ClientLocationPicker";
import { useClientPersistence } from "./client/useClientPersistence";
import { useCurrencyDetection } from "./client/useCurrencyDetection";
import { useClientDefaults } from "./client/useClientDefaults";

interface ClientInfoFormProps {
  clientInfo: {
    id?: string;
    name?: string;
    email?: string;
    address?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
    type?: string;
    status?: string;
  };
  onChange: (field: string, value: string) => void;
}

const ClientInfoForm = ({ clientInfo, onChange }: ClientInfoFormProps) => {
  // Apply default values if not already set
  useClientDefaults({ clientInfo, onChange });

  // Persist client data to localStorage
  useClientPersistence(clientInfo);

  // Handle currency detection based on country
  useCurrencyDetection({ country: clientInfo.country ?? "", onChange });

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <ClientTypeSelect
          value={clientInfo.type ?? "business"}
          onChange={(value) => onChange("type", value)}
        />

        <ClientStatusSelect
          value={clientInfo.status ?? "active"}
          onChange={(value) => onChange("status", value)}
        />
      </div>

      <ClientBasicInfo
        name={clientInfo.name ?? ""}
        email={clientInfo.email ?? ""}
        onNameChange={(value) => onChange("name", value)}
        onEmailChange={(value) => onChange("email", value)}
      />

      <ClientAddress
        address={clientInfo.address ?? ""}
        onChange={(value) => onChange("address", value)}
      />

      <ClientLocationPicker
        country={clientInfo.country ?? ""}
        state={clientInfo.state ?? ""}
        city={clientInfo.city ?? ""}
        zip={clientInfo.zip ?? ""}
        onCountryChange={(value) => onChange("country", value)}
        onStateChange={(value) => onChange("state", value)}
        onCityChange={(value) => onChange("city", value)}
        onZipChange={(value) => onChange("zip", value)}
      />
    </div>
  );
};

export default ClientInfoForm;
