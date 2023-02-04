/**
 * 用户接口
 */
import KoaRouter from 'koa-router'

import { userController } from '../controller'
import { userMiddleware } from '../middleware'

const userRouter = new KoaRouter({ prefix: '/user' })
const { create } = userController
const { verifyUser } = userMiddleware

userRouter.post('/register', verifyUser, create)

export default userRouter
