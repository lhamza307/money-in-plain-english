// Must be required before any other module (server.js's first line) --
// Sentry's auto-instrumentation depends on load order. Phase 0.5.
const Sentry = require('@sentry/node');

// No DSN set (e.g. local dev) -- Sentry SDK no-ops gracefully, doesn't
// throw. Only wired for real once SENTRY_DSN is set (Render production).
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV || 'development',
  tracesSampleRate: 0.1,
});

module.exports = Sentry;
