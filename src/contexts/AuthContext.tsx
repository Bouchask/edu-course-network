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
    console.log("🔍 Signup attempt started:", { email, name });
    
    // Créer un nom d'utilisateur unique à partir de l'email
    const username = email.split('@')[0];
    
    // Extraire le prénom et le nom
    const nameParts = name.split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';
    
    console.log("🧩 Parsed user details:", { username, firstName, lastName });

    // Étape 1: Inscription avec Supabase Auth
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
      console.error("❌ Supabase signup error:", error);
      toast.error(`Erreur d'inscription: ${error.message}`);
      return { error, data: null };
    }

    console.log("✅ Signup successful, user data:", data.user);
    
    // Étape 2: Création du profil - Utiliser upsert avec plus de logs
    if (data.user) {
      try {
        console.log("📝 Attempting to create profile for user:", data.user.id);
        const { error: profileError, data: profileData } = await supabase
          .from('profiles')
          .upsert({
            id: data.user.id,
            username,
            first_name: firstName,
            last_name: lastName
          })
          .select(); // Ajouter .select() pour vérifier la réponse
        
        if (profileError) {
          console.error("❌ Profile creation error:", profileError);
          toast.error("Impossible de créer le profil");
        } else {
          console.log("✅ Profile created successfully:", profileData);
          toast.success("Profil créé avec succès!");
        }
      } catch (catchError) {
        console.error("🚨 Unexpected profile creation error:", catchError);
        toast.error("Erreur inattendue lors de la création du profil");
      }
    }
    
    toast.success("Compte créé avec succès! Vérifiez votre email.");
    return { data, error: null };
  } catch (error) {
    console.error("🚨 Unexpected signup error:", error);
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
