import { userServices } from '../services'
import ErrorTypes from '../global/constants/error_types'

import type { Next, ParameterizedContext } from 'koa'
import type { IUserInfo, Page } from '../global/types'

const { create, updateUser, deleteUser, pageUser } = userServices

class UserController {
  // 登录
  async loginUser(ctx: ParameterizedContext, next: Next) {

  }

  // 新增
  async createUser(ctx: ParameterizedContext, next: Next) {
    // 获取用户请求传递的参数
    const user = ctx.request.body as IUserInfo

    const res = await create(user)
    // 用户名存在(唯一性)
    if (res === true) {
      ctx.app.emit('error', ErrorTypes.USERNAME_EXISTS, ctx)
      return
    }
    // 响应数据
    ctx.body = {
      msg: '新建成功',
    }
  }

  // 修改
  async updateUser(ctx: ParameterizedContext, next: Next) {
    const userInfo = ctx.request.body as IUserInfo
    await updateUser(userInfo)
    ctx.body = {
      msg: '修改成功',
    }
  }

  // 删除
  async deleteUser(ctx: ParameterizedContext, next: Next) {
    const idObj = ctx.request.body as { id: number }
    await deleteUser(idObj)
    ctx.body = {
      msg: '删除成功',
    }
  }

  // 分页
  async pageUser(ctx: ParameterizedContext, next: Next) {
    const data = ctx.request.body as Page
    const res = await pageUser(data)
    ctx.body = {
      msg: '查询成功',
      data: res
    }
  }
}

export default new UserController()
