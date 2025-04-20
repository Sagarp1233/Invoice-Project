
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface RegistrationFormProps {
  onSubmit: (name: string, email: string, password: string) => void;
  loading: boolean;
}

const RegistrationForm = ({ onSubmit, loading }: RegistrationFormProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const { toast } = useToast();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError("");
    
    if (password.length < 8) {
      toast({
        title: "Password too short",
        description: "Password must be at least 8 characters long.",
        variant: "destructive",
      });
      return;
    }
    
    // Check email availability is handled in the parent component
    onSubmit(name, email, password);
  };

  return (
    <form onSubmit={handleFormSubmit} className="mt-6 space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          type="text"
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailError("");
          }}
          className={emailError ? "border-red-500" : ""}
          required
        />
        {emailError && (
          <p className="text-xs text-red-500">{emailError}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <p className="text-xs text-muted-foreground">
          Password must be at least 8 characters long
        </p>
      </div>
      
      <Button
        type="submit"
        className="w-full bg-invoice-purple hover:bg-invoice-darkPurple"
        disabled={loading}
      >
        {loading ? "Creating account..." : "Create account"}
      </Button>
      
      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link to="/auth/login" className="text-invoice-purple hover:underline">
          Sign in
        </Link>
      </div>
    </form>
  );
};

export default RegistrationForm;
