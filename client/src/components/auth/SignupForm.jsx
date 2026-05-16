import { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { User, Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import PremiumButton from '../common/PremiumButton';
import { AuthField } from './AuthLayout';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SignupForm = () => {
  const { signup } = useAuth();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
    setServerError('');
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) {
      next.name = 'Name is required.';
    }
    if (!form.email.trim()) {
      next.email = 'Email is required.';
    } else if (!EMAIL_REGEX.test(form.email.trim())) {
      next.email = 'Enter a valid email address.';
    }
    if (!form.password) {
      next.password = 'Password is required.';
    } else if (form.password.length < 8) {
      next.password = 'Password must be at least 8 characters.';
    }
    if (!form.confirmPassword) {
      next.confirmPassword = 'Please confirm your password.';
    } else if (form.confirmPassword !== form.password) {
      next.confirmPassword = 'Passwords do not match.';
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
      // On success the AuthContext redirects + shows a toast.
      await signup({
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
      });
    } catch (error) {
      setServerError(error.message);
      toast.error(error.message);
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h1 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
        Create your Aion AI account.
      </h1>
      <p className="mt-2 text-sm text-aion-muted">
        Start with 25 free credits and chat with every AI in one place.
      </p>

      {serverError && (
        <div className="mt-6 flex items-start gap-2.5 rounded-xl border border-rose-400/30 bg-rose-400/10 px-4 py-3">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" />
          <p className="text-sm text-rose-200">{serverError}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-7 space-y-5" noValidate>
        <AuthField
          id="name"
          label="Name"
          type="text"
          icon={User}
          placeholder="Your full name"
          autoComplete="name"
          value={form.name}
          onChange={handleChange}
          error={errors.name}
        />

        <AuthField
          id="email"
          label="Email"
          type="email"
          icon={Mail}
          placeholder="you@example.com"
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
          placeholder="At least 8 characters"
          autoComplete="new-password"
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

        <AuthField
          id="confirmPassword"
          label="Confirm Password"
          type={showPassword ? 'text' : 'password'}
          icon={Lock}
          placeholder="Re-enter your password"
          autoComplete="new-password"
          value={form.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
        />

        <PremiumButton type="submit" size="lg" fullWidth loading={submitting}>
          {submitting ? 'Creating account…' : 'Create Account'}
        </PremiumButton>
      </form>

      <p className="mt-6 text-center text-sm text-aion-muted">
        Already have an account?{' '}
        <Link
          to="/login"
          className="font-semibold text-white underline-offset-4 transition-colors hover:text-aion-gold hover:underline"
        >
          Log in
        </Link>
      </p>
    </div>
  );
};

export default SignupForm;
