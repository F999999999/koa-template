// 获取商品信息
module.exports.index = async (ctx, next) => {
  // 获取参数
  const { id } = ctx.request.query;
  // 校验参数
  if (!id) {
    return (ctx.body = {
      status: 400,
      message: "ID不能为空",
    });
  }

  ctx.body = {
    status: 200,
    message: "Hello Koa 2!, id: " + id,
  };
};