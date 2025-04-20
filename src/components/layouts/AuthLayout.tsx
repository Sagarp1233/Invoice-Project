
import React from "react";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-invoice-lightPurple/20 to-invoice-lightGrey p-4">
      <Card className="w-full max-w-md animate-scale-in">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-invoice-purple">InvoiceGenie</span>
            </Link>
          </div>
          {children}
        </CardHeader>
        <CardFooter className="border-t px-6 py-4 flex justify-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} InvoiceGenie. All rights reserved.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AuthLayout;
