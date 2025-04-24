
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';
import { toast } from "sonner";

type AuthContextType = {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{
    error: any | null;
    data: { session: Session | null; user: User | null } | null;
  }>;
  signUp: (email: string, password: string, name: string) => Promise<{
    error: any | null;
    data: { session: Session | null; user: User | null } | null;
  }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if we have a session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setIsLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        toast.error(error.message);
        return { error, data: null };
      }
      
      toast.success("Connexion réussie!");
      return { data, error: null };
    } catch (error) {
      toast.error("Une erreur est survenue lors de la connexion");
      return { error, data: null };
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      console.log("Attempting signup with:", { email, name });
      
      // Create unique username from email
      const username = email.split('@')[0];
      
      // Parse name into first name and last name
      const nameParts = name.split(' ');
      const firstName = nameParts[0];
      const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';
      
      // Step 1: Sign up the user with Supabase Auth with all metadata needed for profile creation
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
            first_name: firstName, 
            last_name: lastName,
            username: username
          },
        },
      });
      
      if (error) {
        toast.error(`Erreur d'inscription: ${error.message}`);
        console.error('Signup error:', error);
        return { error, data: null };
      }

      console.log("Signup successful, user data:", data.user);
      
      // Step 2: Create profile entry - separate from auth flow to avoid blocking signup
      if (data.user) {
        try {
          console.log("Creating initial profile for user:", data.user.id);
          const { error: profileError } = await supabase.from('profiles').upsert({
            id: data.user.id,
            username,
            first_name: firstName,
            last_name: lastName
          });
          
          if (profileError) {
            console.error("Initial profile creation error:", profileError);
            // Don't block signup process, we'll retry later
          } else {
            console.log("Profile created successfully on first attempt");
          }
        } catch (profileErr) {
          console.error("Profile creation exception:", profileErr);
        }
        
        // Schedule additional attempts with exponential backoff
        setTimeout(() => retryProfileCreation(data.user!.id, username, firstName, lastName, 1), 1000);
      }
      
      toast.success("Compte créé avec succès! Vérifiez votre email pour confirmer.");
      return { data, error: null };
    } catch (error) {
      console.error('Unexpected signup error:', error);
      toast.error("Une erreur est survenue lors de la création du compte");
      return { error, data: null };
    }
  };
  
  // Retry profile creation with exponential backoff
  const retryProfileCreation = async (userId: string, username: string, firstName: string, lastName: string, attempt: number) => {
    if (attempt > 5) return; // Max 5 attempts
    
    try {
      console.log(`Profile creation retry attempt ${attempt} for user ${userId}`);
      
      // First check if profile already exists
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();
        
      if (existingProfile) {
        console.log("Profile already exists, no need to create:", existingProfile);
        return;
      }
      
      // Create profile if it doesn't exist
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: userId,
          username,
          first_name: firstName,
          last_name: lastName
        });
      
      if (profileError) {
        console.error(`Profile creation attempt ${attempt} failed:`, profileError);
        // Calculate next retry delay with exponential backoff
        const nextDelay = Math.min(1000 * Math.pow(2, attempt), 30000); // Max 30 seconds
        console.log(`Retry scheduled in ${nextDelay/1000} seconds...`);
        setTimeout(() => retryProfileCreation(userId, username, firstName, lastName, attempt + 1), nextDelay);
      } else {
        console.log(`Profile created successfully on retry attempt ${attempt}`);
      }
    } catch (err) {
      console.error(`Error in retry attempt ${attempt}:`, err);
      
      // Still retry despite errors
      const nextDelay = Math.min(1000 * Math.pow(2, attempt), 30000);
      setTimeout(() => retryProfileCreation(userId, username, firstName, lastName, attempt + 1), nextDelay);
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Déconnexion réussie");
    } catch (error) {
      toast.error("Une erreur est survenue lors de la déconnexion");
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
