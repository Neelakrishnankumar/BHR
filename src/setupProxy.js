// Dev server only (`npm start` / `npm run start:<target>`); not part of the build.
// The hosted config.json files don't send CORS headers, so the browser can't fetch
// them from localhost. The dev server fetches REACT_APP_CONFIG_URL instead and
// serves it at /remote-config.json (see src/config.js).
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  const configUrl = process.env.REACT_APP_CONFIG_URL;
  if (!/^https?:\/\//.test(configUrl || "")) return;

  const { origin, pathname } = new URL(configUrl);

  app.use(
    createProxyMiddleware("/remote-config.json", {
      target: origin,
      changeOrigin: true,
      pathRewrite: () => pathname,
    })
  );
};
