import jwt from 'jsonwebtoken'

import { userServices } from '../services'
import ErrorTypes from '../global/constants/error_types'
import md5password from '../utils/md5password'
import { privateContent } from '../config/keysContent'

import type { Next, ParameterizedContext } from 'koa'
import type { ILogin, IUserInfo, Page } from '../global/types'

const { create, updateUser, deleteUser, pageUser, resetUser } = userServices

class UserController {
  // 登录
  async loginUser(ctx: ParameterizedContext, next: Next) {
    const { username, password } = ctx.request.body as ILogin
    // 判断用户名是否存在
    const res: any = await userServices.loginUser(ctx.request.body as ILogin)
    // 说明不存在该用户名
    if (res.length === 0) {
      ctx.app.emit('error', ErrorTypes.USERNAME_NOT_EXISTS, ctx)
      return
    }
    // 判断密码是否正确
    if (md5password(password) !== res[0].password) {
      // 说明密码错误
      ctx.app.emit('error', ErrorTypes.PASSWORD_ERROR, ctx)
      return
    }
    
    // 实现 token
    const token = jwt.sign(res[0], privateContent,  {
      // expiresIn: 60 * 60 * 24 * 30, // 一个月
      expiresIn: 60 * 60 * 24 * 30, // 一个小时
      algorithm: 'RS256'
    })

    ctx.body = {
      msg: '登录成功',
      data: {
        id: res[0].id,
        role: res[0].role,
        username,
        createTime: res[0].createTime
      },
      token
    }
  }

  // 新增
  async createUser(ctx: ParameterizedContext, next: Next) {
    // 获取用户请求传递的参数
    const user = ctx.request.body as IUserInfo
    // 创建时间
    const createTime = Date.now()
    user.createTime = String(createTime)
    
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
      data: res?.data,
      total: res?.total
    }
  }

  // 重置密码
  async resetUser(ctx: ParameterizedContext, next: Next) {
    const { id } = ctx.userInfo
    const finallyPassword = md5password('000000');
    const res = await resetUser(id, finallyPassword);

    ctx.body = {
      msg: '重置密码成功'
    }
  }
}

export default new UserController()
