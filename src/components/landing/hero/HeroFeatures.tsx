
import React from "react";
import { CheckCircle } from "lucide-react";

const HeroFeatures = () => {
  return (
    <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 pt-6 text-sm text-muted-foreground">
      <span className="flex items-center">
        <CheckCircle className="mr-2 h-4 w-4 text-invoice-purple" /> No credit card required
      </span>
      <span className="flex items-center">
        <CheckCircle className="mr-2 h-4 w-4 text-invoice-purple" /> 100% free for basic use
      </span>
      <span className="flex items-center">
        <CheckCircle className="mr-2 h-4 w-4 text-invoice-purple" /> Professional templates
      </span>
    </div>
  );
};

export default HeroFeatures;
