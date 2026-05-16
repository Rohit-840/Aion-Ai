import api from '../config/api';

/**
 * Authentication API calls.
 * Each method returns the parsed response payload.
 */
export const authService = {
  /** Register a new user. payload: { name, email, password } */
  register: (payload) => api.post('/auth/register', payload).then((res) => res.data),

  /** Log in an existing user. payload: { email, password } */
  login: (payload) => api.post('/auth/login', payload).then((res) => res.data),

  /** Clear the session. */
  logout: () => api.post('/auth/logout').then((res) => res.data),

  /** Fetch the currently authenticated user (relies on the auth cookie). */
  getCurrentUser: () => api.get('/auth/me').then((res) => res.data),
};

export default authService;
