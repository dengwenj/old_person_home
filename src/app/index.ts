/**
 * @date 2023/2/3 PM 23:05
 * @description app 相关的功能
 */
import Koa from 'koa'
import bodyparser from 'koa-bodyparser'
import cors from 'koa2-cors'
import type { IApplication } from '../global/types'

// import { userRouter } from '../router'
import useRoutes from '../router/useRoutes'
import errorHandle from './error_handle'

const app: IApplication = new Koa()
app.useRoutes = useRoutes

// 解决跨域
app.use(cors())
// 用于解析 boby
app.use(bodyparser())
// 动态加载路由
app.useRoutes(app)

// 错误处理
app.on('error', errorHandle)

export default app
