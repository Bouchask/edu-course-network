
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
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
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      });
      
      if (error) {
        toast.error(`Erreur d'inscription: ${error.message}`);
        console.error('Signup error:', error);
        return { error, data: null };
      }
      
      // Store user profile in the profiles table if signup was successful
      if (data.user) {
        try {
          const { error: profileError } = await supabase.from('profiles').insert([
            { id: data.user.id, name, email }
          ]);
          
          if (profileError) {
            console.error('Profile creation error:', profileError);
            toast.error("Compte créé mais impossible de sauvegarder le profil");
          }
        } catch (profileErr) {
          console.error('Profile insert error:', profileErr);
        }
      }
      
      toast.success("Compte créé avec succès! Vérifiez votre email pour confirmer.");
      return { data, error: null };
    } catch (error) {
      console.error('Unexpected signup error:', error);
      toast.error("Une erreur est survenue lors de la création du compte");
      return { error, data: null };
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
