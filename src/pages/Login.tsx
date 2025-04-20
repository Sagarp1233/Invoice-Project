
import { CardDescription, CardTitle } from "@/components/ui/card";
import LoginForm from "@/components/auth/LoginForm";
import { useLogin } from "@/hooks/auth/useLogin";
import { useEffect } from "react";
import { createTestUser } from "@/utils/createTestUser";
import { Link } from "react-router-dom";

const Login = () => {
  const { 
    email, 
    setEmail, 
    password, 
    setPassword, 
    loading, 
    error, 
    setError, 
    handleLogin 
  } = useLogin();

  // Create test user on component mount if none exists
  useEffect(() => {
    const testUserCreated = createTestUser();
    if (testUserCreated) {
      console.log('Test user is available: email: test@example.com, password: password123');
    }
  }, []);

  const isEmailConfirmationError = error.includes("not confirmed");

  return (
    <>
      <CardTitle className="text-2xl text-center">Welcome back</CardTitle>
      <CardDescription className="text-center mt-2">
        Enter your email to sign in to your account
      </CardDescription>
      
      <LoginForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        loading={loading}
        error={error}
        setError={setError}
        onSubmit={handleLogin}
      />

      {isEmailConfirmationError && (
        <div className="mt-4 text-center">
          <p className="text-sm text-amber-600 mb-2">
            Your email needs to be confirmed before logging in.
          </p>
          <p className="text-xs text-muted-foreground">
            Please check your inbox for the confirmation email or{" "}
            <Link to="/auth/register" className="text-invoice-purple hover:underline">
              register again
            </Link>
            .
          </p>
        </div>
      )}
    </>
  );
};

export default Login;
