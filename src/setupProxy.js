// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/tdt',
    createProxyMiddleware({
      target: 'http://t0.tianditu.gov.cn/',
      changeOrigin: true,
      pathRewrite: {
        '^/tdt': '', // 
      },
    })
  );
  app.use(
    '/zcy',
    createProxyMiddleware({
      target: 'http://172.18.10.203:7986/',
      changeOrigin: true,
      pathRewrite: {
        '^/zcy': '', // 保证路径保留 /geoserver
      },
    })
  );
};