import { Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import LoadingScreen from './LoadingScreen';

/**
 * Guards admin-only routes.
 * - While auth is resolving      → loading screen
 * - Not authenticated            → redirect to /login
 * - Authenticated but not admin  → redirect to /app-placeholder
 */
const AdminRoute = ({ children }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) {
    return <LoadingScreen message="Verifying access" />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/app-placeholder" replace />;
  }

  return children;
};

export default AdminRoute;
