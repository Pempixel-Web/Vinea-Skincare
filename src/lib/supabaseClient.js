import { createClient } from '@supabase/supabase-js';

// Credentials come from environment variables only — never hardcoded.
// Use the PUBLISHABLE key (starts with sb_publishable_). Never the secret/
// service-role key: this file ships to the browser.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  // eslint-disable-next-line no-console
  console.warn(
    '[Vinea] Supabase env vars are missing. Set VITE_SUPABASE_URL and ' +
      'VITE_SUPABASE_PUBLISHABLE_KEY in your .env file — see .env.example.'
  );
}

export const supabase = createClient(supabaseUrl || '', supabaseKey || '');
