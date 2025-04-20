import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: "admin" | "staff";
  plan: "free" | "pro";
}

export const useUser = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
      const {
        data: { user },
        error: sessionError,
      } = await supabase.auth.getUser();

      if (sessionError || !user) {
        setError("User not found or session expired");
        setProfile(null);
        setLoading(false);
        return;
      }

      const { data, error: profileError } = await supabase
        .from("profiles")
        .select("id, email, name, role, plan")
        .eq("id", user.id)
        .single();

      if (profileError || !data) {
        setError("Failed to load user profile");
        setProfile(null);
      } else {
        setProfile(data as UserProfile);
      }

      setLoading(false);
    };

    fetchUserProfile();
  }, []);

  return {
    profile,
    loading,
    error,
    isAdmin: profile?.role === "admin",
    isPro: profile?.plan === "pro",
  };
};
