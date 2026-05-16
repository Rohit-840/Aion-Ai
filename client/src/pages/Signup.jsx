import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import AuthLayout from '../components/auth/AuthLayout';
import SignupForm from '../components/auth/SignupForm';
import { APP_CONFIG } from '../config/appConfig';

/**
 * /signup — premium split-screen signup page.
 * Already-authenticated users are redirected away:
 *   admins → /admin, everyone else → appConfig.js target.
 */
const Signup = () => {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  // External redirect target — handled imperatively (non-admins only).
  useEffect(() => {
    if (!loading && isAuthenticated && !isAdmin && APP_CONFIG.USE_EXTERNAL_REDIRECT) {
      window.location.href = APP_CONFIG.POST_AUTH_REDIRECT_URL;
    }
  }, [loading, isAuthenticated, isAdmin]);

  if (!loading && isAuthenticated) {
    if (isAdmin) {
      return <Navigate to="/admin" replace />;
    }
    if (!APP_CONFIG.USE_EXTERNAL_REDIRECT) {
      return <Navigate to={APP_CONFIG.POST_AUTH_REDIRECT_URL} replace />;
    }
  }

  return (
    <AuthLayout>
      <SignupForm />
    </AuthLayout>
  );
};

export default Signup;
