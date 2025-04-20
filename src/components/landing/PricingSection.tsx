import React, { useEffect, useState } from 'react';
import { Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface PricingFeature {
  name: string;
  included: boolean;
}

interface PricingPlan {
  name: string;
  price: number;
  currency: string;
  description: string;
  features: PricingFeature[];
  buttonText: string;
  isPopular?: boolean;
}

const PricingSection = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsLoggedIn(!!session);
    };
    checkSession();
  }, []);

  const plans: PricingPlan[] = [
    {
      name: "Free",
      price: 0,
      currency: "₹",
      description: "Basic invoicing for individuals",
      features: [
        { name: "Create & download unlimited invoices", included: true },
        { name: "Customize logo, company name", included: true },
        { name: "Currency and tax settings", included: true },
        { name: "Email invoices", included: true },
        { name: "Shows ads", included: true },
      ],
      buttonText: "Get Started",
    },
    {
      name: "Pro",
      price: 199,
      currency: "₹",
      description: "Everything you need for professional invoicing",
      features: [
        { name: "All Free features", included: true },
        { name: "Save invoice and client history", included: true },
        { name: "Multiple invoice templates", included: true },
        { name: "Branded PDF (no watermark)", included: true },
        { name: "No ads", included: true },
        { name: "Export data", included: true },
        { name: "Priority support", included: true },
      ],
      buttonText: "Upgrade",
      isPopular: true,
    },
    {
      name: "Business",
      price: 499,
      currency: "₹",
      description: "Advanced features for growing businesses",
      features: [
        { name: "All Pro features", included: true },
        { name: "Recurring invoices", included: true },
        { name: "Bulk Email/SMS support", included: true },
        { name: "Read receipts and tracking", included: true },
        { name: "GST/Tax reports", included: true },
        { name: "Team access", included: true },
        { name: "Advanced analytics", included: true },
      ],
      buttonText: "Upgrade",
    },
  ];

  const handlePlanSelection = (plan: PricingPlan) => {
    if (!isLoggedIn) {
      navigate('/auth/login', { state: { from: '/pricing' } });
      return;
    }

    if (plan.name === 'Free') {
      toast({
        title: "You're on the Free Plan",
        description: "You can now use all the features of the Free plan!",
        variant: "default",
      });
    } else {
      // Real upgrade logic here
      navigate('/dashboard');
    }
  };

  return (
    <section className="py-24 bg-invoice-lightGrey" id="pricing">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight gradient-heading mb-2">Simple, Transparent Pricing</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that's right for you. Get started for free today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <Card 
              key={plan.name} 
              className={`flex flex-col h-full border ${plan.isPopular ? 'border-invoice-purple shadow-lg' : ''}`}
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    <CardDescription className="mt-1">{plan.description}</CardDescription>
                  </div>
                  {plan.isPopular && (
                    <Badge className="bg-invoice-purple text-primary-foreground">
                      Most Popular
                    </Badge>
                  )}
                </div>
                <div className="mt-4 flex items-baseline text-4xl font-extrabold">
                  {plan.currency}{plan.price}
                  <span className="ml-1 text-xl font-medium text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="mt-4 space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{feature.name}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="pt-4">
                <Button 
                  className="w-full" 
                  onClick={() => handlePlanSelection(plan)}
                  variant={plan.isPopular ? "default" : "outline"}
                >
                  {plan.buttonText}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button variant="link" className="text-invoice-purple font-medium" onClick={() => {
            toast({
              title: "All Features Available",
              description: "All plan features are now shown on this page, no login required!",
              variant: "default",
            });
          }}>
            View all features
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
