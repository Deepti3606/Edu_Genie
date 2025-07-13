import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, isConfigured } from '../lib/supabase';
import { User } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  userProfile: any | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string, role: 'teacher' | 'student') => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
  isSupabaseConfigured: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const isSupabaseConfigured = isConfigured;

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUserProfile(session.user.id);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        await fetchUserProfile(session.user.id);
        await updateLastLogin(session.user.id);
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId: string) => {
    if (!supabase) return;
    
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      setUserProfile(data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const updateLastLogin = async (userId: string) => {
    if (!supabase) return;
    
    try {
      await supabase
        .from('users')
        .update({ last_login: new Date().toISOString() })
        .eq('id', userId);
    } catch (error) {
      console.error('Error updating last login:', error);
    }
  };

  const sendLoginNotification = async (email: string, name: string) => {
    try {
      // Send email notification to admin
      await fetch('/api/send-notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: 'yeppy798@gmail.com',
          subject: 'New EduGenie Login',
          message: `User ${name} (${email}) has logged into EduGenie at ${new Date().toLocaleString()}`
        })
      });
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        await sendLoginNotification(email, userProfile?.name || 'Unknown User');
      }
    } catch (error) {
      throw error;
    }
  };

  const signup = async (email: string, password: string, name: string, role: 'teacher' | 'student') => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        // Create user profile
        const { error: profileError } = await supabase
          .from('users')
          .insert({
            id: data.user.id,
            email,
            name,
            role,
            usage_time: 0
          });

        if (profileError) throw profileError;

        await sendLoginNotification(email, name);
      }
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      throw error;
    }
  };

  const value = {
    user,
    userProfile,
    login,
    signup,
    logout,
    loading,
    isSupabaseConfigured
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};