
import { useEffect } from 'react';

interface ClientInfo {
  country: string;
  type?: string;
  status?: string;
}

interface ClientDefaultsProps {
  clientInfo: ClientInfo;
  onChange: (field: string, value: string) => void;
}

export const useClientDefaults = ({ clientInfo, onChange }: ClientDefaultsProps) => {
  useEffect(() => {
    // Set default country to India if not already set
    if (!clientInfo.country) {
      onChange('country', 'IN');
    }
    
    // Set default client type if not set
    if (!clientInfo.type) {
      onChange('type', 'business');
    }
    
    // Set default status if not set
    if (!clientInfo.status) {
      onChange('status', 'active');
    }
  }, [clientInfo, onChange]);
};
