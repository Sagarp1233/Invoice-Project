
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";
import { clientTypes } from "@/utils/locationData";

interface ClientBadgesProps {
  status: string;
  type: string;
}

export const ClientBadges: React.FC<ClientBadgesProps> = ({ status, type }) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1">
            <Check className="h-3 w-3" /> Active
          </Badge>
        );
      case 'inactive':
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-600 border-gray-200 flex items-center gap-1">
            <X className="h-3 w-3" /> Inactive
          </Badge>
        );
      default:
        return null;
    }
  };

  const getClientTypeBadge = (type: string) => {
    const clientType = clientTypes.find(t => t.value === type);
    return (
      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
        {clientType?.label || type}
      </Badge>
    );
  };

  return (
    <div className="mt-1 flex gap-1">
      {getStatusBadge(status)}
      {type && getClientTypeBadge(type)}
    </div>
  );
};
