
import { createClient } from '@supabase/supabase-js';

// Configuration du client Supabase avec les valeurs de votre projet
const supabaseUrl = 'https://mhvjahkowemkimnagwvv.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1odmphZmtvd2Vta2ltbmFnd3Z2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM0NzA2MjMsImV4cCI6MjAyOTA0NjYyM30.GiwyXp6hd6MCmZQgznMsKwpZzeF3dB7dUVDgIT6m-sM';

// Création d'un seul client Supabase pour toute l'application
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
