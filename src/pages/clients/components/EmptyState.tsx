
import { Button } from "@/components/ui/button";
import { Plus, Users } from "lucide-react";

interface EmptyStateProps {
  searchActive: boolean;
  onAddClient: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ searchActive, onAddClient }) => {
  return (
    <div className="text-center py-12 bg-gray-50 rounded-lg">
      <Users className="h-12 w-12 mx-auto text-gray-400 mb-3" />
      <h3 className="text-lg font-medium text-gray-900">No clients found</h3>
      <p className="mt-1 text-sm text-gray-500">
        {searchActive ? 
          "Try adjusting your search or filter" : 
          "Get started by adding your first client"}
      </p>
      {!searchActive && (
        <Button
          onClick={onAddClient}
          className="mt-4 bg-invoice-purple hover:bg-invoice-darkPurple"
        >
          <Plus className="h-4 w-4 mr-2" /> Add Client
        </Button>
      )}
    </div>
  );
};
