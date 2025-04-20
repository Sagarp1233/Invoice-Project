// integration/supabase/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

// Replace these with your Supabase project URL and API Key
const supabaseUrl = 'https://yajykfpcpccdnzdzyves.supabase.co'; // Replace with your Supabase URL
const supabaseKey =  process.env.SUPABASE_KEY // Replace with your Supabase API Key

export const supabase = createClient(supabaseUrl, supabaseKey);
