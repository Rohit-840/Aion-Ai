import { useAuthContext } from '../context/AuthContext';

/**
 * Convenience hook for consuming the auth context.
 *
 * Usage:
 *   const { user, isAuthenticated, isAdmin, login, signup, logout } = useAuth();
 */
export const useAuth = () => useAuthContext();

export default useAuth;
