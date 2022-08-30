const { query } = require("../db/mysql");

/**
 * @description 查询用户是否存在
 * @param {String} username 用户名
 * @param {Object} conn 数据池连接
 * @returns {Promise}
 */
module.exports.findUserByUserName = async (username, conn = null) => {
  return await query(
    "SELECT id FROM sys_user WHERE username=?",
    [username],
    conn
  );
};

/**
 * @description 用户注册
 * @param {String} username 用户名
 * @param {String} password 用户密码
 * @param {Number} isStates 用户状态（0.禁用 1.正常 默认值：1）
 * @param {Object} conn 数据池连接
 * @returns {Promise}
 */
module.exports.register = async (
  { username, password, isStates = 1 },
  conn = null
) => {
  return await query(
    "INSERT INTO sys_user(username, password,states) VALUES(?,?,?)",
    [username, password, isStates],
    conn
  );
};

/**
 * @description 查询用户信息
 * @param {String} username 用户名
 * @param {String} password 用户密码
 * @param {Object} conn 数据池连接
 * @returns {Promise}
 */
module.exports.findUserInfo = async ({ username, password }, conn = null) => {
  return await query(
    "SELECT id,username,password,states FROM sys_user WHERE username= ? AND password = ?",
    [username, password],
    conn
  );
};
