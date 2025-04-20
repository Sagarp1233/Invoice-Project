
import { Button } from "@/components/ui/button";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const RegistrationSuccess = () => {
  const navigate = useNavigate();

  return (
    <>
      <CardTitle className="text-2xl text-center">Registration Completed!</CardTitle>
      <CardDescription className="text-center">
        Your account has been created successfully
      </CardDescription>
      
      <div className="mt-8 flex flex-col items-center justify-center space-y-6">
        <div className="rounded-full bg-green-100 p-3">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        
        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            You will be redirected to the dashboard shortly...
          </p>
          <Button 
            onClick={() => navigate("/dashboard")} 
            className="w-full bg-invoice-purple hover:bg-invoice-darkPurple"
          >
            Go to Dashboard
          </Button>
        </div>
        
        <div className="text-center text-sm">
          <Link to="/auth/login" className="text-invoice-purple hover:underline">
            Sign in with different account
          </Link>
        </div>
      </div>
    </>
  );
};

export default RegistrationSuccess;
