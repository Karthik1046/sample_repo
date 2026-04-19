const express = require('express');
const app = express();

// Read environment variables injected at build/runtime
const PORT    = process.env.PORT    || 3000;
const ENV     = process.env.APP_ENV || 'production';
const VERSION = process.env.APP_VERSION || '1.0.0';
const BUILD   = process.env.BUILD_ID    || 'local';

// ─── Routes ──────────────────────────────────────────────────────────────────

app.get('/', (req, res) => {
  res.json({
    message   : `Hello from the ${ENV.toUpperCase()} environment! 🚀`,
    app       : 'DevOps Sample App',
    version   : VERSION,
    buildId   : BUILD,
    environment: ENV,
    port      : PORT,
    timestamp : new Date().toISOString(),
  });
});

app.get('/health', (req, res) => {
  res.json({
    status : 'healthy',
    uptime : process.uptime(),
    env    : ENV,
  });
});

app.get('/info', (req, res) => {
  res.json({
    nodeVersion : process.version,
    platform    : process.platform,
    environment : ENV,
    buildId     : BUILD,
  });
});

// ─── Server ───────────────────────────────────────────────────────────────────

app.listen(PORT, () => {
  console.log(`[${ENV.toUpperCase()}] Server running on port ${PORT}`);
  console.log(`Build ID : ${BUILD}`);
  console.log(`Version  : ${VERSION}`);
});

module.exports = app;
