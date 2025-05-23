
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://mhvjahkowemkimnagwvv.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1odmphaGtvd2Vta2ltbmFnd3Z2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU0MTkxOTgsImV4cCI6MjA2MDk5NTE5OH0.JWN8cQjUyAeRFXTwnGvVW4byqHtaOSjUmjU4iSFCAhk";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    storage: typeof window !== 'undefined' ? localStorage : undefined, // Check if window is defined first
    storageKey: 'supabase-auth',  // add a specific storage key
    detectSessionInUrl: true,  // detect session from URL
  }
});
