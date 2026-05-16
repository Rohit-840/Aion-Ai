/* ════════════════════════════════════════════════════════════════
   Aion AI — Post-authentication redirect configuration
   ════════════════════════════════════════════════════════════════

   This is the single place that controls where users land AFTER a
   successful login or signup.

   ──────────────────────────────────────────────────────────────
   HOW TO USE THIS FILE
   ──────────────────────────────────────────────────────────────

   • Right now users are sent to the internal placeholder page
     ("/app-placeholder"). That page is intentionally minimal — it is
     a slot reserved for your real AI dashboard.

   • To redirect users to an INTERNAL React route (default), keep:
        USE_EXTERNAL_REDIRECT: false
     The app will run:  navigate(APP_CONFIG.POST_AUTH_REDIRECT_URL)

   • To redirect users to an EXTERNAL dashboard URL later, set:
        POST_AUTH_REDIRECT_URL: "https://your-dashboard-domain.com"
        USE_EXTERNAL_REDIRECT: true
     The app will run:  window.location.href = APP_CONFIG.POST_AUTH_REDIRECT_URL

   That is the only change required to swap the placeholder for your
   final dashboard or an external app.
   ──────────────────────────────────────────────────────────────── */

export const APP_CONFIG = {
  // Where users go after a successful login / signup.
  // Internal route example : "/app-placeholder"
  // External URL example   : "https://your-dashboard-domain.com"
  POST_AUTH_REDIRECT_URL: '/app-placeholder',

  // false → treat POST_AUTH_REDIRECT_URL as an internal React Router route.
  // true  → treat POST_AUTH_REDIRECT_URL as a full external URL.
  USE_EXTERNAL_REDIRECT: false,
};

export default APP_CONFIG;
