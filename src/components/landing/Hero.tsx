
import React from "react";
import HeroTitle from "./hero/HeroTitle";
import HeroDescription from "./hero/HeroDescription";
import HeroButtons from "./hero/HeroButtons";
import HeroFeatures from "./hero/HeroFeatures";

const Hero = () => {
  return (
    <div className="relative overflow-hidden py-20 lg:py-32">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-invoice-lightPurple/20 to-invoice-lightGrey -z-10" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto space-y-6 animate-fade-in">
          <HeroTitle />
          <HeroDescription />
          <HeroButtons />
          <HeroFeatures />
        </div>
      </div>
    </div>
  );
};

export default Hero;
