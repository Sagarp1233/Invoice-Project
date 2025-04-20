
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Lock } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";

interface InvoiceTemplateCardProps {
  id: string;
  name: string;
  imageUrl: string;
  description?: string;
  isSelected: boolean;
  onSelect: (id: string) => void;
  disabled?: boolean;
  badge?: string;
}

const InvoiceTemplateCard: React.FC<InvoiceTemplateCardProps> = ({
  id,
  name,
  imageUrl,
  description,
  isSelected,
  onSelect,
  disabled = false,
  badge = "",
}) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  // Reset image states when URL changes
  useEffect(() => {
    setImgLoaded(false);
    setImgError(false);
  }, [imageUrl]);

  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      onSelect(id);
    }
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      onSelect(id);
    }
  };

  return (
    <Card
      className={`overflow-hidden transition-all duration-200 hover:shadow-md cursor-pointer ${
        isSelected ? "ring-2 ring-invoice-purple" : ""
      } ${disabled ? "opacity-75" : ""}`}
      onClick={handleCardClick}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        {!imgLoaded && !imgError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="animate-pulse h-10 w-10 rounded-full bg-gray-200"></div>
          </div>
        )}
        
        {imgError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <span className="text-gray-500">Image unavailable</span>
          </div>
        )}
        
        <img
          src={imageUrl}
          alt={name}
          className={`h-full w-full object-contain transition-transform duration-300 hover:scale-105 ${
            !imgLoaded ? 'opacity-0' : 'opacity-100'
          } ${disabled ? 'grayscale' : ''}`}
          onLoad={() => setImgLoaded(true)}
          onError={() => {
            setImgError(true);
            setImgLoaded(false);
          }}
        />
        
        {isSelected && (
          <div className="absolute inset-0 bg-invoice-purple/10 flex items-center justify-center">
            <div className="h-10 w-10 rounded-full bg-invoice-purple flex items-center justify-center">
              <Check className="h-6 w-6 text-white" />
            </div>
          </div>
        )}
        
        {/* Premium Badge */}
        {badge && (
          <Badge className="absolute top-2 right-2 bg-amber-500 text-white">
            {badge}
          </Badge>
        )}
        
        {/* Lock overlay for locked templates */}
        {disabled && (
          <div className="absolute inset-0 bg-slate-900/30 flex items-center justify-center">
            <Lock className="h-12 w-12 text-white opacity-75" />
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <p className="font-medium">{name}</p>
            <Button
              variant={isSelected ? "default" : "outline"}
              size="sm"
              className={isSelected ? "bg-invoice-purple hover:bg-invoice-darkPurple" : ""}
              onClick={handleButtonClick}
              disabled={disabled}
            >
              {isSelected ? "Selected" : disabled ? "Locked" : "Select"}
            </Button>
          </div>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default InvoiceTemplateCard;
