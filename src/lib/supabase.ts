
import { createClient } from '@supabase/supabase-js';

// Configuration du client Supabase avec les valeurs de votre projet
const supabaseUrl = 'https://mhvjahkowemkimnagwvv.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1odmphaGtvd2Vta2ltbmFnd3Z2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU0MTkxOTgsImV4cCI6MjA2MDk5NTE5OH0.JWN8cQjUyAeRFXTwnGvVW4byqHtaOSjUmjU4iSFCAhk';

// Création d'un seul client Supabase pour toute l'application
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

