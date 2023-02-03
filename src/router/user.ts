/**
 * 用户接口
 */
import KoaRouter from 'koa-router'
import { userController } from '../controller'

const userRouter = new KoaRouter({ prefix: '/user' })
const { create } = userController

userRouter.post('/register', create)

export default userRouter
