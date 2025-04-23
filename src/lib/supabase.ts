
import { createClient } from '@supabase/supabase-js';

// Pour le développement, on utilise des valeurs par défaut
// Dans un environnement de production, ces valeurs devraient être fournies par des variables d'environnement
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project-id.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

if (supabaseUrl === 'https://your-project-id.supabase.co' || supabaseAnonKey === 'your-anon-key') {
  console.warn('⚠️ Vous utilisez des valeurs par défaut pour Supabase. Pour connecter votre application à votre projet Supabase, remplacez ces valeurs par vos URL et clé réelles.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
