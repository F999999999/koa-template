const router = require("koa-router")();

const { register, login, Info } = require("../controller/users");

// 前缀
router.prefix("/users");

// 注册
router.post("/register", register);
// 登录
router.post("/login", login);
// 信息
router.get("/info", Info);

module.exports = router;
