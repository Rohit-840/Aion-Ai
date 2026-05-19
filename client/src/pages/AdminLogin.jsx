import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ShieldCheck, Mail, Lock, Eye, EyeOff, AlertCircle, ArrowLeft } from 'lucide-react';
import useAuth from '../hooks/useAuth';
import { AuthField } from '../components/auth/AuthLayout';
import PremiumButton from '../components/common/PremiumButton';
import Container from '../components/common/Container';
import Badge from '../components/common/Badge';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * /aiadmin — dedicated admin sign-in portal.
 *
 * Only accounts with the "admin" role are admitted. Any other account
 * is immediately signed out and rejected (see adminLogin in AuthContext).
 */
const AdminLogin = () => {
  const { adminLogin, isAuthenticated, isAdmin, loading } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Already signed in as an admin → go straight to the panel.
  if (!loading && isAuthenticated && isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
    setServerError('');
  };

  const validate = () => {
    const next = {};
    if (!form.email.trim()) {
      next.email = 'Email is required.';
    } else if (!EMAIL_REGEX.test(form.email.trim())) {
      next.email = 'Enter a valid email address.';
    }
    if (!form.password) {
      next.password = 'Password is required.';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setServerError('');
    try {
      // On success the AuthContext redirects to /admin.
      await adminLogin({ email: form.email.trim(), password: form.password });
    } catch (error) {
      setServerError(error.message);
      toast.error(error.message);
      setSubmitting(false);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col">
      <Container className="flex flex-1 flex-col items-center justify-center py-16">
        <div className="w-full max-w-md">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm text-aion-muted transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to site
          </Link>

          <div className="glow-card mt-4 rounded-3xl p-7 sm:p-8">
            {/* Header */}
            <div className="flex flex-col items-center text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-aion-violet/10 ring-1 ring-aion-violet/25">
                <ShieldCheck className="h-7 w-7 text-aion-violet" />
              </span>
              <div className="mt-4">
                <Badge tone="violet" dot>
                  Restricted access
                </Badge>
              </div>
              <h1 className="mt-4 font-display text-2xl font-bold tracking-tight text-white">
                Admin Control Center
              </h1>
              <p className="mt-2 text-sm text-aion-muted">
                Sign in with administrator credentials to manage Aion AI.
              </p>
            </div>

            {serverError && (
              <div className="mt-6 flex items-start gap-2.5 rounded-xl border border-rose-400/30 bg-rose-400/10 px-4 py-3">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" />
                <p className="text-sm text-rose-200">{serverError}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-5" noValidate>
              <AuthField
                id="email"
                label="Admin email"
                type="email"
                icon={Mail}
                placeholder="admin@aionstudio.com"
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                error={errors.email}
              />

              <AuthField
                id="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                icon={Lock}
                placeholder="Enter your password"
                autoComplete="current-password"
                value={form.password}
                onChange={handleChange}
                error={errors.password}
                rightSlot={
                  <button
                    type="button"
                    onClick={() => setShowPassword((show) => !show)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/35 transition-colors hover:text-white"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                }
              />

              <PremiumButton type="submit" size="lg" fullWidth loading={submitting}>
                {submitting ? 'Verifying…' : 'Sign in to Admin'}
              </PremiumButton>
            </form>

            <p className="mt-5 text-center text-xs text-aion-muted">
              Not an administrator?{' '}
              <Link
                to="/login"
                className="font-semibold text-white underline-offset-4 transition-colors hover:text-aion-gold hover:underline"
              >
                Use the standard login
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AdminLogin;
