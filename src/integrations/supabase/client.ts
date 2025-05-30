
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://yajykfpcpccdnzdzyves.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlhanlrZnBjcGNjZG56ZHp5dmVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ0NDc4NTIsImV4cCI6MjA2MDAyMzg1Mn0.hIaxWBE20Qom1gBIXBP-TxzWKxT_T86yByggpbGbegM";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    storage: localStorage
  }
});
