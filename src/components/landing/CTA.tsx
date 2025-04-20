
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface CTAProps {
  isLoggedIn?: boolean;
}

const CTA = ({ isLoggedIn = false }: CTAProps) => {
  return (
    <section className="relative overflow-hidden bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Create Beautiful Invoices in Minutes
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Join thousands of businesses that use InvoiceGenie to streamline
            their invoicing process. Get started for free today.
          </p>
          <div className="mt-8 flex justify-center">
            {isLoggedIn ? (
              <Link to="/dashboard">
                <Button size="lg" className="bg-invoice-purple hover:bg-invoice-darkPurple">
                  Go to Dashboard
                </Button>
              </Link>
            ) : (
              <Link to="/auth/register">
                <Button size="lg" className="bg-invoice-purple hover:bg-invoice-darkPurple">
                  Get Started Free
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="absolute -top-24 -left-24 opacity-20 blur-3xl">
        <div className="aspect-square h-96 rounded-full bg-gradient-to-br from-invoice-purple to-pink-400"></div>
      </div>
      <div className="absolute -bottom-24 -right-24 opacity-20 blur-3xl">
        <div className="aspect-square h-96 rounded-full bg-gradient-to-br from-invoice-purple to-green-400"></div>
      </div>
    </section>
  );
};

export default CTA;
