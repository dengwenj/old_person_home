import mysql2 from 'mysql2'

import env from '../app/conf'

// 创建连接池，设置连接池的参数
const connection = mysql2.createPool({
  host: env.MYSQL_HOST,
  port: env.MYSQL_PORT,
  database: env.MYSQL_DATABASE,
  user: env.MYSQL_USER,
  password: env.MYSQL_PASSWORD
})

connection.getConnection((err) => {
  if (err) {
    console.log('数据库连接失败', err)
    return
  }
  console.log('数据库连接成功')
})

export default connection.promise()
