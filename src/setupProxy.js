const proxy = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    proxy.createProxyMiddleware("/api", {
      target: " http://192.168.1.57:9527",//
      changeOrigin: true
    })
  );
};
