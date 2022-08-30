const requireDirectory = require("require-directory");
const Router = require("koa-router");

// 自动加载路由
module.exports.loadRouters = (app) => {
  const whenLoadModule = (obj) => {
    if (obj instanceof Router) {
      app.use(obj.routes()).use(obj.allowedMethods());
    }
  };
  requireDirectory(module, {
    visit: whenLoadModule,
  });
};
