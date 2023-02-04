import { userServices } from '../services'

import type { Next, ParameterizedContext } from 'koa'

const { create } = userServices

class UserController {
  async create(ctx: ParameterizedContext, next: Next) {
    // 获取用户请求传递的参数
    const user: any = ctx.request.body
    // 查询数据库数据
    const res = await create(user)
    // 响应数据
    ctx.body = res
  }
}

export default new UserController()
