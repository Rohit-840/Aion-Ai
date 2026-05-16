const jwt = require('jsonwebtoken');

const COOKIE_NAME = 'aion_token';
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

/**
 * Sign a JWT for the given user id.
 */
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

/**
 * Cookie options shared by set + clear so the browser matches them.
 * `secure` is only enabled in production (requires HTTPS).
 */
const baseCookieOptions = () => ({
  httpOnly: true,
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production',
  path: '/',
});

/**
 * Generate a token and attach it to the response as an httpOnly cookie.
 */
const sendTokenCookie = (res, userId) => {
  const token = generateToken(userId);
  res.cookie(COOKIE_NAME, token, {
    ...baseCookieOptions(),
    maxAge: SEVEN_DAYS_MS,
  });
  return token;
};

/**
 * Clear the auth cookie (used on logout).
 */
const clearTokenCookie = (res) => {
  res.clearCookie(COOKIE_NAME, baseCookieOptions());
};

module.exports = {
  COOKIE_NAME,
  generateToken,
  sendTokenCookie,
  clearTokenCookie,
};
