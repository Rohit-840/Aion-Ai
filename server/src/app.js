const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/authRoutes');
const creditRoutes = require('./routes/creditRoutes');
const adminRoutes = require('./routes/adminRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const app = express();

// ── Security & parsing ─────────────────────────
app.use(helmet());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ── CORS (credentials required for httpOnly cookie auth) ──
// CLIENT_URL may be a comma-separated list of allowed origins.
const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Non-browser requests (curl, server-to-server) send no Origin.
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      // In development, allow LAN origins so the app can be opened from
      // phones / other devices via the Vite network URL.
      if (process.env.NODE_ENV !== 'production') return callback(null, true);
      return callback(new Error(`Origin ${origin} is not allowed by CORS`));
    },
    credentials: true,
  })
);

// ── Request logging (development only) ─────────
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// ── Health check ───────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Aion AI API is running.' });
});

// ── API routes ─────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/credits', creditRoutes);
app.use('/api/admin', adminRoutes);

// ── Error handling (must be last) ──────────────
app.use(notFound);
app.use(errorHandler);

module.exports = app;
