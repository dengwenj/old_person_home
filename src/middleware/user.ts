import ErrorTypes from '../global/constants/error_types'

import type { Next, ParameterizedContext } from "koa"
import type { IUserInfo } from '../global/types'

// 判断用户名密码
async function verifyUser(ctx: ParameterizedContext, next: Next) {
  const { username, password } = ctx.request.body as IUserInfo
  
  if (!username || !password) {
    ctx.app.emit('error', ErrorTypes.USERNAME_OR_PASSWORD_IS_REQUIRED, ctx)
    return
  }

  await next()
}

const userMiddleware = {
  verifyUser
}

export default userMiddleware
