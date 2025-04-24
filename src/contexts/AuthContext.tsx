
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
      
      // Step 2: Create profile entry - separate from auth flow to avoid blocking signup
      if (data.user) {
        // Attempt to create profile immediately and also schedule a delayed retry
        createUserProfile(data.user.id, username, firstName, lastName);
        
        // Also schedule a delayed retry in case the first attempt fails due to timing issues
        setTimeout(() => {
          // Only retry if the user exists but still needs a profile
          console.log("Scheduling delayed profile creation check");
          checkAndCreateProfile(data.user?.id, username, firstName, lastName);
        }, 2000);
      }
      
      toast.success("Compte créé avec succès! Vérifiez votre email pour confirmer.");
      return { data, error: null };
    } catch (error) {
      console.error('Unexpected signup error:', error);
      toast.error("Une erreur est survenue lors de la création du compte");
      return { error, data: null };
    }
  };
  
  // Check if profile exists and create if missing
  const checkAndCreateProfile = async (userId?: string, username?: string, firstName?: string, lastName?: string) => {
    if (!userId) return;
    
    try {
      console.log("Checking if profile exists for:", userId);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
        
      if (error || !data) {
        console.log("Profile doesn't exist, creating now...");
        createUserProfile(userId, username || '', firstName || '', lastName || '');
      } else {
        console.log("Profile already exists:", data);
      }
    } catch (err) {
      console.error("Error checking profile:", err);
    }
  };
  
  // Separate function to create user profile
  const createUserProfile = async (userId: string, username: string, firstName: string, lastName: string) => {
    try {
      console.log("Creating profile for user:", userId);
      
      // Try up to 3 times with delays between attempts
      for (let attempt = 1; attempt <= 3; attempt++) {
        console.log(`Profile creation attempt ${attempt} for user ${userId}`);
        
        const { error } = await supabase
          .from('profiles')
          .upsert(
            {
              id: userId,
              username,
              first_name: firstName,
              last_name: lastName
            },
            { 
              onConflict: 'id',
              ignoreDuplicates: false // update the row if it already exists
            }
          );
        
        if (!error) {
          console.log("Profile created successfully on attempt", attempt);
          return;
        }
        
        console.error(`Profile creation attempt ${attempt} failed:`, error);
        
        if (attempt < 3) {
          // Wait before retrying (exponential backoff)
          const delay = attempt * 1000;
          console.log(`Retrying in ${delay/1000} seconds...`);
          await new Promise(resolve => setTimeout(resolve, delay));
        } else {
          toast.error("Compte créé mais impossible de sauvegarder le profil");
        }
      }
    } catch (error) {
      console.error('Profile creation error:', error);
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
