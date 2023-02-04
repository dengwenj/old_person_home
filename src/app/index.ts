/**
 * @date 2023/2/3 PM 23:05
 * @description app 相关的功能
 */
import Koa from 'koa'
import bodyparser from 'koa-bodyparser'

import { userRouter } from '../router'
import errorHandle from './error_handle'


const app = new Koa()

// 用于解析 boby
app.use(bodyparser())
app.use(userRouter.routes())
app.use(userRouter.allowedMethods())

app.on('error', errorHandle)

export default app
