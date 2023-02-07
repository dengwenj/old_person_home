import ErrorTypes from '../global/constants/error_types'
import { userServices } from '../services'

import type { Next, ParameterizedContext } from "koa"
import type { IUserInfo, ILogin } from '../global/types'
import md5password from '../utils/md5password'

// 判断用户名密码
async function verifyUser(ctx: ParameterizedContext, next: Next) {
  const { username, password, role } = ctx.request.body as IUserInfo
  
  if (!username || !password || !role) {
    ctx.app.emit('error', ErrorTypes.USERNAME_OR_PASSWORD_IS_REQUIRED, ctx)
    return
  }

  // 密码加密
  const finallyPassword = md5password(password);
  (ctx.request.body as IUserInfo).password = finallyPassword

  // 下一个中间件要有结果才会执行 await 下面的代码
  await next()
}

// 登陆
async function verifyLogin(ctx: ParameterizedContext, next: Next) {
  const { username, password } = ctx.request.body as ILogin

  // 判断用户名密码是否为空
  if (!username || !password) {
    ctx.app.emit('error', ErrorTypes.USERNAME_OR_PASSWORD_IS_REQUIRED, ctx)
    return
  }

  // 判断用户名是否存在
  const res: any = await userServices.loginUser({ username, password })
  // 说明不存在该用户名
  if (res.length === 0) {
    ctx.app.emit('error', ErrorTypes.USERNAME_NOT_EXISTS, ctx)
    return
  }

  // 判断密码是否正确

}

const userMiddleware = {
  verifyUser,
  verifyLogin
}

export default userMiddleware
