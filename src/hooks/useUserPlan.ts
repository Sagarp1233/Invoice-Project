import { useState, useEffect } from 'react';
import { UserPlan } from '@/utils/acl';
import { supabase } from '@/integrations/supabase/client';

export const useUserPlan = () => {
  const [userPlan, setUserPlan] = useState<UserPlan>('free');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserPlan = async () => {
      try {
        // 1. LocalStorage override (for testing/dev only)
        const storedPlan = localStorage.getItem('userPlan') as UserPlan | null;
        if (storedPlan && ['free', 'pro', 'business'].includes(storedPlan)) {
          setUserPlan(storedPlan);
          setLoading(false);
          return;
        }

        // 2. Fetch from Supabase 'profiles' table
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError || !session?.user) {
          console.warn("No authenticated session found");
          setUserPlan('free');
          return;
        }

        const userId = session.user.id;

        const { data: profile, error } = await supabase
          .from("profiles")
          .select("plan")
          .eq("id", userId)
          .single();

        if (error || !profile?.plan) {
          console.warn("No plan found in profile. Defaulting to 'free'.", error);
          setUserPlan('free');
        } else {
          setUserPlan(profile.plan as UserPlan);
        }
      } catch (err) {
        console.error('Error loading user plan:', err);
        setUserPlan('free');
      } finally {
        setLoading(false);
      }
    };

    loadUserPlan();
  }, []);

  const updateUserPlan = (plan: UserPlan) => {
    // Store in localStorage (only used for dev/testing)
    localStorage.setItem('userPlan', plan);
    setUserPlan(plan);
  };

  return { userPlan, loading, updateUserPlan };
};
