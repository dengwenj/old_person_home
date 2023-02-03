/**
 * @date 2023/2/3 PM 22:32
 * @description 启动入口
 */
import app from './app'
import env from './app/conf'
import './dataBase'

app.listen(env.APP_PORT, () => {
  console.log('服务器启动成功' + env.APP_PORT)
})
