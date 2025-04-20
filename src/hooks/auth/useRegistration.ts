import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const useRegistration = () => {
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleRegister = async (name: string, email: string, password: string) => {
    setEmailError("");
    setLoading(true);

    try {
      // Register user with Supabase
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            defaultCurrency: "USD",
            dateFormat: "MMM d, yyyy",
            country: "US"
          }
        }
      });

      if (error) {
        setEmailError(error.message);
        toast({
          title: "Registration failed",
          description: error.message,
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      // ✅ Insert default role and plan into profiles
      if (data.user) {
        const { error: profileError } = await supabase.from("profiles").insert([
          {
            id: data.user.id,
            email: data.user.email,
            name: name,
            role: "admin",   // Default for all signups
            plan: "free"     // Default plan
          }
        ]);

        if (profileError) {
          console.error("Error inserting profile:", profileError.message);
          toast({
            title: "Profile setup failed",
            description: "Could not create user profile. Please contact support.",
            variant: "destructive",
          });
          setLoading(false);
          return;
        }
      }

      setLoading(false);
      setRegistered(true);
      toast({
        title: "Account created!",
        description: "You have successfully registered.",
      });

      if (data.session) {
        // If email verification is not required
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } else {
        // Email verification required
        toast({
          title: "Verification required",
          description: "Please check your email to verify your account.",
        });
      }
    } catch (error) {
      console.error("Error during registration:", error);
      toast({
        title: "Registration failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  return {
    loading,
    registered,
    emailError,
    handleRegister,
    setEmailError
  };
};
