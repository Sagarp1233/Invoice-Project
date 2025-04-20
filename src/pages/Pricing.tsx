import React from 'react';
import { Check, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import DashboardLayout from '@/components/layouts/DashboardLayout';

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
  isComingSoon?: boolean;
}

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const Pricing: React.FC = () => {
  const { toast } = useToast();

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
      isComingSoon: true,
    },
  ];

  const handlePlanSelection = async (plan: PricingPlan) => {
    if (plan.isComingSoon) {
      toast({
        title: "Coming Soon",
        description: `The ${plan.name} plan will be available soon!`,
      });
      return;
    }

    if (plan.price === 0) {
      toast({
        title: "You're on the Free Plan",
        description: "You can now use all the features of the Free plan!",
      });
      return;
    }

    try {
      const res = await loadRazorpayScript();
      if (!res) {
        toast({ title: "Error", description: "Failed to load payment gateway.", variant: "destructive" });
        return;
      }

      const response = await fetch("http://localhost:4000/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: plan.price * 100 })
      });

      if (!response.ok) {
        throw new Error("Order creation failed");
      }

      const orderData = await response.json();

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY || "rzp_live_4BJANPRgYV2kgG", // Replace with your key
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Invoicify Genie",
        description: plan.description,
        order_id: orderData.id,
        handler: function (response: any) {
          toast({
            title: "Payment Successful!",
            description: `Payment ID: ${response.razorpay_payment_id}`,
          });

          // TODO: Save payment data or update user plan
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
        },
        theme: {
          color: "#7c3aed",
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Something went wrong while creating the order.",
        variant: "destructive",
      });
    }
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto py-12 px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tight gradient-heading mb-2">
            Simple, Transparent Pricing
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that's right for you and start creating professional invoices today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
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
                <div className="mt-4 flex items-baseline text-5xl font-extrabold">
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

        <div className="mt-12 max-w-3xl mx-auto">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Not sure which plan is right for you?</AlertTitle>
            <AlertDescription>
              Start with our Free plan and upgrade anytime as your business grows.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Pricing;
