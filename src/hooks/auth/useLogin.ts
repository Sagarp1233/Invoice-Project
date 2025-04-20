import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export function useLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      // Try to log in with Supabase
      const { data, error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (loginError) {
        console.error("Login error:", loginError.message);
        
        // Handle specific error cases
        if (loginError.message.includes("Email not confirmed")) {
          setError("Your email address has not been confirmed. Please check your inbox for the confirmation email.");
          toast({
            title: "Email not confirmed",
            description: "Please check your inbox for the confirmation email or register again.",
            variant: "destructive",
          });
        } else {
          setError(loginError.message);
          toast({
            title: "Login failed",
            description: loginError.message,
            variant: "destructive",
          });
        }
        
        setLoading(false);
        return;
      }
      
      if (data.session) {
        // Fetch user role and plan from profiles
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("role, plan")
          .eq("id", data.session.user.id)
          .single();

        if (profileError || !profileData) {
          console.error("Error fetching user profile:", profileError?.message);
          toast({
            title: "Login failed",
            description: "User profile could not be loaded.",
            variant: "destructive",
          });
          setLoading(false);
          return;
        }

        // Store role and plan locally (optional - for quick access)
        localStorage.setItem("userRole", profileData.role);
        localStorage.setItem("userPlan", profileData.plan);

        toast({
          title: "Success!",
          description: "You have been logged in successfully.",
        });

        // Redirect to dashboard
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred while logging in");
      toast({
        title: "Login failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password, 
    setPassword,
    loading,
    error,
    setError,
    handleLogin
  };
}
