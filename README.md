# Aion AI

> Every AI model, one intelligent conversation.

**Aion AI** is the first version of a multi-AI chatbot platform — one place
to chat with every leading AI model, coordinated by **Aion Mind**, a master
agent that routes each request to the best models and merges their answers.

This version is a production-quality MERN foundation: a cinematic marketing
website, secure authentication, a credit/token system, and a protected admin
panel. It **does not** include real AI chat or payment processing yet — it is
the polished, expandable base those features will plug into.

---

## 1. Project Overview

- A premium, fully responsive **marketing website** (landing, agents, pricing)
- **JWT authentication** with bcrypt-hashed passwords and httpOnly cookies
- A real **credit system** — every user starts with 25 credits, and every
  credit movement is recorded as a transaction
- A protected, dark-premium **admin panel** for managing users and credits
- Role-aware redirects — **admins** land on `/admin`; **users** are sent to a
  configurable target (an internal placeholder, or your external chat app)

## 2. The concept

Aion AI brings several leading AI models into one workspace:

> **Aion Mind** (master agent) · ChatGPT · Claude · Gemini · Grok ·
> Perplexity · DeepSeek · Copilot

**Aion Mind** is the flagship agent. Instead of making users pick a model, it
reads the request, calls on the strongest models for the job, and combines
their strengths into one answer.

> Third-party model names are referenced descriptively only. Aion AI uses its
> own original avatars (never the vendors' logos) and is not affiliated with
> or endorsed by these companies.

## 3. Features

- Cinematic hero with a live chat-interface mockup
- "Meet the AIs" agent line-up + a dedicated **Aion Mind** spotlight section
- Filterable **Explore AI Agents** directory
- Detailed pricing page with FAQ accordion
- Smooth Lenis scrolling, Framer Motion + GSAP ScrollTrigger animations
- 25 starter credits on signup, with a recorded transaction
- Admin panel: stats, users table, transactions ledger, credit modal
- Fully responsive, reduced-motion aware, accessible

## 4. Tech Stack

| Layer        | Technologies |
|--------------|--------------|
| **Frontend** | React, Vite, React Router DOM, Tailwind CSS, Framer Motion, GSAP + ScrollTrigger, Lenis, Three.js + React Three Fiber, Axios, Lucide React, React Hot Toast |
| **Backend**  | Node.js, Express.js, MongoDB, Mongoose, JWT, bcryptjs, cookie-parser, cors, dotenv, helmet, express-rate-limit, morgan |
| **Database** | MongoDB (local or MongoDB Atlas) |

## 5. Folder Structure

```
aion-ai/
├─ package.json            # root scripts (run client + server together)
├─ client/                 # React + Vite frontend
│  └─ src/
│     ├─ config/           # api.js, appConfig.js  ← post-auth redirect
│     ├─ context/          # AuthContext.jsx
│     ├─ hooks/            # useAuth, useLenis, useScrollAnimation
│     ├─ data/             # botsData, landingData, pricingData, galleryData
│     ├─ services/         # authService, creditService, adminService
│     ├─ components/
│     │  ├─ common/        # Navbar, Footer, BotAvatar, ArtVisual, guards…
│     │  ├─ landing/       # Hero, VisualShowcase, AionMind, FeatureSection…
│     │  ├─ auth/          # AuthLayout, LoginForm, SignupForm
│     │  └─ admin/         # AdminLayout, tables, CreditModal…
│     └─ pages/            # Home, Agents, Gallery, Pricing, Login,
│                          #   Signup, AppPlaceholder, Admin, NotFound
└─ server/                 # Express + MongoDB backend
   ├─ scripts/createAdmin.js
   └─ src/
      ├─ server.js / app.js
      ├─ config/db.js
      ├─ models/           # User, CreditTransaction
      ├─ controllers/      # auth, credit, admin
      ├─ middleware/       # auth, admin, error
      ├─ routes/           # auth, credit, admin
      └─ utils/            # generateToken, creditService
```

## 6. Setup

### Prerequisites
- **Node.js** 18+ and npm
- **MongoDB** — a local instance or a MongoDB Atlas connection string

### Install

```bash
npm install            # root dev tools (concurrently)
npm run install:all    # installs root + server + client dependencies
```

## 7. Environment Variables

Copy each `.env.example` to `.env` and fill in the values.

### `server/.env`

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/aion_studio
JWT_SECRET=replace_with_a_long_secure_secret
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
ADMIN_NAME=Admin
ADMIN_EMAIL=admin@aionstudio.com
ADMIN_PASSWORD=Admin@12345
```

> **MongoDB Atlas note:** if your password contains special characters
> (`@ : / ? # [ ]`), they **must be URL-encoded** in `MONGO_URI` (e.g. `@`
> becomes `%40`). If SRV lookups fail (`querySrv ECONNREFUSED`), use the
> standard non-`+srv` connection string from the Atlas dashboard instead.

### `client/.env`

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## 8. Running the App

```bash
# Backend  → http://localhost:5000
cd server && npm run dev

# Frontend → http://localhost:5173
cd client && npm run dev
```

Or run both together from the project root:

```bash
npm run dev
```

## 9. Seeding the Admin Account

The admin account is created from the `ADMIN_*` values in `server/.env`.

```bash
cd server
npm run seed:admin
```

Then log in at `/login` with `ADMIN_EMAIL` / `ADMIN_PASSWORD` — admins are
sent straight to `/admin`.

## 10. Post-Login Redirect

Two redirect rules apply after a successful login or signup:

- **Admins** always go to **`/admin`**.
- **Everyone else** uses `client/src/config/appConfig.js`:

  ```js
  export const APP_CONFIG = {
    POST_AUTH_REDIRECT_URL: '/app-placeholder',
    USE_EXTERNAL_REDIRECT: false,
  };
  ```

  - `USE_EXTERNAL_REDIRECT: false` → internal route via `navigate()`.
  - To send users to your **external chat app** later, set the URL and
    `USE_EXTERNAL_REDIRECT: true` — the app then uses `window.location.href`.

That single file is the only change needed to point users at the real app.

## 11. How the Credit System Works

- Every new user starts with **25 credits**, plus an initial `credit`
  transaction.
- Each `CreditTransaction` stores a **signed** amount (positive = added,
  negative = removed), a reason, the resulting balance, and a timestamp.
- All credit movements go through one helper
  (`server/src/utils/creditService.js`) so balances and the ledger stay in
  sync. Future AI-chat routes can call the same helper to charge per message.

## 12. Admin Panel

Open `/admin` as an admin user. Three tabs:

- **Overview** — user + credit metrics and recent activity.
- **Users** — searchable table; add/remove credits and activate/suspend.
- **Transactions** — the full credit ledger.

Every `/api/admin/*` route is JWT-protected and admin-only.

## 13. Future Integration Notes

1. **Point at your real app** — set `appConfig.js` to your external chat URL.
2. **Charge per message** — chat routes can call `applyCreditChange()` to
   deduct credits and record a `debit` transaction.
3. **Add payments** — paid plans already exist as product structure in
   `client/src/data/pricingData.js`.
4. **Connect real models** — the auth, credit and admin layers are already
   production-shaped.

---

## License

MIT — © 2026 Aion AI.
