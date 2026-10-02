import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

interface AuthContextValue {
  session: Session | null;
  isAdmin: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const GENERIC_AUTH_ERROR = 'Unable to sign in';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkAdmin = useCallback(async (currentSession: Session | null): Promise<boolean> => {
    if (!currentSession) {
      setIsAdmin(false);
      return false;
    }

    const { data, error } = await supabase
      .from('admin_users')
      .select('user_id')
      .eq('user_id', currentSession.user.id)
      .maybeSingle();
    const allowed = !error && data?.user_id === currentSession.user.id;
    setIsAdmin(allowed);
    return allowed;
  }, []);

  useEffect(() => {
    let mounted = true;

    const initialize = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error || !data.session) {
          if (mounted) {
            setSession(null);
            setIsAdmin(false);
          }
          return;
        }

        const allowed = await checkAdmin(data.session);
        if (!mounted) return;

        if (allowed) {
          setSession(data.session);
        } else {
          await supabase.auth.signOut();
          setSession(null);
        }
      } catch {
        if (mounted) {
          setSession(null);
          setIsAdmin(false);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    void initialize();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      void (async () => {
        const allowed = await checkAdmin(newSession);
        if (!allowed && newSession) {
          await supabase.auth.signOut();
          if (mounted) setSession(null);
        }
      })();
    });

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, [checkAdmin]);

  const signIn = useCallback(async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error || !data.session) {
        return { error: GENERIC_AUTH_ERROR };
      }

      const allowed = await checkAdmin(data.session);
      if (!allowed) {
        await supabase.auth.signOut();
        setSession(null);
        return { error: GENERIC_AUTH_ERROR };
      }

      setSession(data.session);
      return { error: null };
    } catch {
      return { error: GENERIC_AUTH_ERROR };
    }
  }, [checkAdmin]);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setSession(null);
    setIsAdmin(false);
  }, []);

  const value: AuthContextValue = {
    session,
    isAdmin,
    loading,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
}
