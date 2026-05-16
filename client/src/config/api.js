import axios from 'axios';

/**
 * Resolve the API base URL.
 *
 * - If VITE_API_BASE_URL points at a real (non-localhost) host, trust it
 *   — this is the production / explicit-override case.
 * - Otherwise the base URL is derived from the host the app is being
 *   viewed on. This means it works automatically whether you open the
 *   site on http://localhost:5173 OR on a network URL like
 *   http://192.168.x.x:5173 — the API call goes to the SAME host on
 *   port 5000.
 */
const API_PORT = 5000;

const resolveBaseURL = () => {
  const envURL = import.meta.env.VITE_API_BASE_URL;
  const { protocol, hostname } = window.location;
  const isLocalHost = hostname === 'localhost' || hostname === '127.0.0.1';

  // Explicit, non-localhost override always wins (production).
  if (envURL && !/localhost|127\.0\.0\.1/.test(envURL)) {
    return envURL;
  }

  // Viewing over the network → talk to the API on the same host.
  if (!isLocalHost) {
    return `${protocol}//${hostname}:${API_PORT}/api`;
  }

  // Local development default.
  return envURL || `${protocol}//${hostname}:${API_PORT}/api`;
};

/**
 * Shared Axios instance for the Aion AI API.
 * - `withCredentials` lets the browser send/receive the httpOnly auth cookie.
 * - the response interceptor normalises errors into a readable Error.
 */
const api = axios.create({
  baseURL: resolveBaseURL(),
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      'Something went wrong. Please try again.';

    const normalised = new Error(message);
    normalised.status = error.response?.status ?? null;
    normalised.isNetworkError = !error.response;
    return Promise.reject(normalised);
  }
);

export default api;
