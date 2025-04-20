import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";

interface SessionHandlerProps {
  setSession: (session: Session | null) => void;
  setLoading: (loading: boolean) => void;
}

const SessionHandler = ({ setSession, setLoading }: SessionHandlerProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setLoading(false);

        if (event === 'SIGNED_IN') {
          toast({
            title: "Welcome back!",
            description: `You're now signed in as ${session?.user?.email}`,
          });
        } else if (event === 'SIGNED_OUT') {
          toast({
            title: "Signed out",
            description: "You have been signed out successfully",
          });
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [toast, navigate, location]);

  return null;
};

export default SessionHandler;
