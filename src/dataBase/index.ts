import mysql2 from 'mysql2'

import env from '../app/conf'

const connection = mysql2.createConnection({
  host: env.MYSQL_HOST,
  port: env.MYSQL_PORT,
  database: env.MYSQL_DATABASE,
  user: env.MYSQL_USER,
  password: env.MYSQL_PASSWORD
})

connection.connect((err) => {
  if (err) {
    console.log('数据库连接失败', err)
    return
  }
  console.log('数据库连接成功')
})

export default connection