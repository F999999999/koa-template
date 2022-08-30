const mysql = require("mysql2");

// 导入数据库配置信息
const { mysqlConfig } = require("./config");

// 创建连接池
const pool = mysql.createPool(mysqlConfig);

// 开启事务
module.exports.beginTransaction = async () => {
  // 开发环境中打印
  if (process.env.NODE_ENV === "development") {
    console.log("[sql]", "==========>  开启事务");
  }
  // 从连接池中获取一条连接
  const conn = await pool.promise().getConnection();
  // 开启事务
  await conn.beginTransaction();
  return conn;
};

// 提交事务
module.exports.commitTransaction = async (conn) => {
  if (conn) {
    // 开发环境中打印
    if (process.env.NODE_ENV === "development") {
      console.log("[sql]", "==========>  提交事务");
    }
    // 提交事务
    await conn.commit();
    // 释放连接
    conn.release();
  }
};

// 回滚事务
module.exports.rollbackTransaction = async (conn) => {
  // 开发环境中打印
  if (process.env.NODE_ENV === "development") {
    console.log("[sql]", "==========>  回滚事务");
  }
  // 回滚事务
  await conn.rollback();
  // 释放连接
  conn.release();
};

// 使用事务执行SQL语句
module.exports.transactionQuery = async (sql, payload = [], conn) => {
  let rows = [];
  // 判断是否有多条SQL语句
  if (Array.isArray(sql)) {
    for (let i = 0; i < sql.length; i++) {
      // 开发环境中打印sql语句
      if (process.env.NODE_ENV === "development") {
        console.log("[sql]", mysql.format(sql, payload));
      }
      // 执行SQL语句
      const [row] = await conn.execute(sql[i], payload[i]);
      rows.push(row);
    }
  } else {
    // 开发环境中打印sql语句
    if (process.env.NODE_ENV === "development") {
      console.log("[sql]", mysql.format(sql, payload));
    }
    // 执行SQL语句
    [rows] = await conn.execute(sql, payload);
  }
  return rows;
};

// 自动事务执行SQL语句
module.exports.autoTransactionQuery = async (sql, payload = []) => {
  // 从连接池中获取一条连接
  const conn = await pool.promise().getConnection();
  const rows = this.transactionQuery(sql, payload, conn);
  // 释放连接
  conn.release();
  return rows;
};

// 执行SQL语句
module.exports.query = async (sql, payload = [], conn) => {
  if (conn) {
    return await this.transactionQuery(sql, payload, conn);
  } else {
    return await this.autoTransactionQuery(sql, payload);
  }
};
