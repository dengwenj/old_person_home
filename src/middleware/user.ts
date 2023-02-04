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

  // 下一个中间件要有结果才会执行 await 下面的代码
  await next()
}

const userMiddleware = {
  verifyUser
}

export default userMiddleware
