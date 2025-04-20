
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const HeroButtons = () => {
  return (
    <div className="flex flex-wrap justify-center gap-4 pt-4">
      <Button size="lg" className="bg-invoice-purple hover:bg-invoice-darkPurple" asChild>
        <Link to="/invoice/create">
          Create Free Invoice <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
      <Button size="lg" variant="outline" asChild>
        <Link to="/auth/register">
          Sign Up for Free
        </Link>
      </Button>
    </div>
  );
};

export default HeroButtons;
