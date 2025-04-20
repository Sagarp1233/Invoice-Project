
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

interface LoginFormProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  loading: boolean;
  error: string;
  setError: (error: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const LoginForm = ({
  email,
  setEmail,
  password,
  setPassword,
  loading,
  error,
  setError,
  onSubmit
}: LoginFormProps) => {
  return (
    <form onSubmit={onSubmit} className="mt-8 space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
          className={error ? "border-red-500" : ""}
          required
        />
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          <Link to="/auth/reset-password" className="text-sm text-invoice-purple hover:underline">
            Forgot password?
          </Link>
        </div>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      
      <Button
        type="submit"
        className="w-full bg-invoice-purple hover:bg-invoice-darkPurple"
        disabled={loading}
      >
        {loading ? "Signing in..." : "Sign in"}
      </Button>
      
      <div className="text-center text-sm mt-6">
        Don't have an account?{" "}
        <Link to="/auth/register" className="text-invoice-purple hover:underline">
          Sign up
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
