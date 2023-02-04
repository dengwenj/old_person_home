import { userServices } from '../services'

import type { Next, ParameterizedContext } from 'koa'
import type { IUserInfo } from '../global/types'

const { create, updateUser, deleteUser } = userServices

class UserController {
  // 新增
  async createUser(ctx: ParameterizedContext, next: Next) {
    // 获取用户请求传递的参数
    const user = ctx.request.body as IUserInfo
    // 查询数据库数据
    const res = await create(user)
    // 响应数据
    ctx.body = res
  }

  // 修改
  async updateUser(ctx: ParameterizedContext, next: Next) {
    const userInfo = ctx.request.body as IUserInfo
    const res = await updateUser(userInfo)
    ctx.body = res
  }

  // 删除
  async deleteUser(ctx: ParameterizedContext, next: Next) {
    const idObj = ctx.request.body as { id: number }
    const res = await deleteUser(idObj)
    ctx.body = res
  }
}

export default new UserController()
