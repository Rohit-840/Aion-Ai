import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { authService } from '../services/authService';
import { APP_CONFIG } from '../config/appConfig';

const AuthContext = createContext(null);

/**
 * Global authentication provider.
 *
 * Exposes: user, loading, isAuthenticated, isAdmin,
 *          login(), signup(), logout(), refreshUser().
 *
 * On mount it calls /api/auth/me to restore an existing session.
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ── Restore session on first load ───────────────
  const loadUser = useCallback(async () => {
    try {
      const data = await authService.getCurrentUser();
      setUser(data.user);
    } catch {
      // No / invalid session — that's expected for guests.
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  // ── Post-auth redirect ───────────────────────────
  // Admins always go to the admin panel. Everyone else uses the
  // configurable target in appConfig.js (internal route or external URL).
  const redirectAfterAuth = useCallback(
    (authedUser) => {
      if (authedUser?.role === 'admin') {
        navigate('/admin');
        return;
      }
      if (APP_CONFIG.USE_EXTERNAL_REDIRECT) {
        window.location.href = APP_CONFIG.POST_AUTH_REDIRECT_URL;
      } else {
        navigate(APP_CONFIG.POST_AUTH_REDIRECT_URL);
      }
    },
    [navigate]
  );

  // ── Actions ─────────────────────────────────────
  const login = useCallback(
    async (credentials) => {
      const data = await authService.login(credentials);

      // Admins must use the dedicated /aiadmin portal — reject here.
      if (data.user.role === 'admin') {
        try {
          await authService.logout();
        } catch {
          /* ignore — the session is discarded either way */
        }
        setUser(null);
        throw new Error('Admin accounts must sign in from the admin portal.');
      }

      setUser(data.user);
      toast.success(`Welcome back, ${data.user.name.split(' ')[0]}.`);
      redirectAfterAuth(data.user);
      return data.user;
    },
    [redirectAfterAuth]
  );

  // Admin-only login — used by the dedicated /aiadmin portal.
  // Any account that is not an admin is immediately signed out + rejected.
  const adminLogin = useCallback(
    async (credentials) => {
      const data = await authService.login(credentials);

      if (data.user.role !== 'admin') {
        try {
          await authService.logout();
        } catch {
          /* ignore — the session is discarded either way */
        }
        setUser(null);
        throw new Error('These credentials do not have admin access.');
      }

      setUser(data.user);
      toast.success(`Welcome back, ${data.user.name.split(' ')[0]}.`);
      navigate('/admin');
      return data.user;
    },
    [navigate]
  );

  const signup = useCallback(
    async (payload) => {
      const data = await authService.register(payload);
      setUser(data.user);
      toast.success('Account created — 25 starter credits added.');
      redirectAfterAuth(data.user);
      return data.user;
    },
    [redirectAfterAuth]
  );

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } catch {
      // Even if the request fails, clear the client session.
    }
    setUser(null);
    toast.success('You have been signed out.');
    navigate('/');
  }, [navigate]);

  const refreshUser = useCallback(async () => {
    try {
      const data = await authService.getCurrentUser();
      setUser(data.user);
      return data.user;
    } catch {
      setUser(null);
      return null;
    }
  }, []);

  const value = {
    user,
    loading,
    isAuthenticated: Boolean(user),
    isAdmin: user?.role === 'admin',
    login,
    adminLogin,
    signup,
    logout,
    refreshUser,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Internal context consumer — prefer the `useAuth` hook in components.
 */
export const useAuthContext = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuthContext must be used within an <AuthProvider>.');
  }
  return ctx;
};

export default AuthContext;
