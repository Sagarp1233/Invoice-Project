
import { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Testimonials from "@/components/landing/Testimonials";
import PricingSection from "@/components/landing/PricingSection";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Eye, Download, Send } from "lucide-react";

interface IndexProps {
  isLoggedIn?: boolean;
}

interface SavedInvoice {
  id: string;
  invoiceNumber: string;
  clientInfo: {
    name: string;
  };
  createdAt: string;
  total: number;
}

const Index = ({ isLoggedIn = false }: IndexProps) => {
  const [savedInvoices, setSavedInvoices] = useState<SavedInvoice[]>([]);
  const location = useLocation();
  const pricingSectionRef = useRef<HTMLDivElement>(null);
  
  // Add scroll restoration and hash handling
  useEffect(() => {
    if (location.hash === '#pricing' && pricingSectionRef.current) {
      pricingSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);
  
  // Load saved invoices for logged-in users
  useEffect(() => {
    if (isLoggedIn) {
      const invoicesData = localStorage.getItem('invoices');
      if (invoicesData) {
        try {
          const parsedInvoices = JSON.parse(invoicesData);
          setSavedInvoices(parsedInvoices);
        } catch (error) {
          console.error("Error parsing saved invoices:", error);
        }
      }
    }
  }, [isLoggedIn]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar isLoggedIn={isLoggedIn} />
      <main className="flex-grow">
        <Hero />
        <Features />
        <div ref={pricingSectionRef} id="pricing">
          <PricingSection />
        </div>
        <Testimonials />
        
        {/* Saved Invoices Section for logged-in users */}
        {isLoggedIn && (
          <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900">Your Saved Invoices</h2>
                <p className="mt-4 text-lg text-gray-600">
                  {savedInvoices.length > 0 
                    ? "Manage and view your previously created invoices" 
                    : "You haven't created any invoices yet"}
                </p>
              </div>
              
              <div className="mt-8">
                {savedInvoices.length > 0 ? (
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {savedInvoices.map((invoice) => (
                      <Card key={invoice.id} className="hover:shadow-md transition-shadow">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg flex justify-between items-start">
                            <span>{invoice.invoiceNumber}</span>
                            <span className="text-sm font-medium text-invoice-purple">
                              ${invoice.total.toFixed(2)}
                            </span>
                          </CardTitle>
                          <p className="text-sm text-muted-foreground">
                            {invoice.clientInfo.name}
                          </p>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground mb-4">
                            Created: {new Date(invoice.createdAt).toLocaleDateString()}
                          </p>
                          <div className="flex space-x-2">
                            <Link to={`/invoice/create?edit=${invoice.id}`}>
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4 mr-1" /> View
                              </Button>
                            </Link>
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-1" /> PDF
                            </Button>
                            <Button variant="outline" size="sm">
                              <Send className="h-4 w-4 mr-1" /> Send
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <FileText className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-lg font-medium text-gray-900">No invoices yet</h3>
                    <p className="mt-1 text-sm text-gray-500">Get started by creating your first invoice.</p>
                    <div className="mt-6">
                      <Link to="/invoice/create">
                        <Button className="bg-invoice-purple hover:bg-invoice-darkPurple">
                          Create Your First Invoice
                        </Button>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}
        
        <CTA isLoggedIn={isLoggedIn} />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
