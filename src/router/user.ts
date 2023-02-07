/**
 * 用户接口
 */
import KoaRouter from 'koa-router'

import { userController } from '../controller'
import { userMiddleware } from '../middleware'
import verifyAuth from '../middleware/verifyAuth'

const userRouter = new KoaRouter({ prefix: '/user' })
const { 
  createUser, 
  updateUser, 
  deleteUser, 
  pageUser,
  loginUser
} = userController
const { 
  verifyUser,
  verifyLogin
} = userMiddleware

// 登录
userRouter.post('/login', verifyLogin, loginUser)
// 新增
userRouter.post('/register',verifyAuth, verifyUser, createUser)
// 编辑
userRouter.post('/update', updateUser)
// 删除
userRouter.post('/delete', deleteUser)
// 分页查询
userRouter.post('/page', pageUser)

export default userRouter
