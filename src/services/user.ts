import mysqlSqlEncapsulation from '../utils/mysql'

import type { ILogin, IUserInfo } from '../global/types'
import type { Page } from '../global/types' 

const { 
  actionAdd, 
  actionUpdate,
  actionDelete,
  actionPage,
  actionQuery
} = mysqlSqlEncapsulation

class UserServices {
  // 登录
  loginUser(loginInfo: ILogin) {
    const { username, password } = loginInfo
    const res = actionQuery('user', `username = '${username}'`)
    return res
  }

  // 新增
  async create({ username, password, role, createTime }: IUserInfo) {
    // 用户名唯一
    const res1: any = await actionQuery('user', `username = '${username}'`)
    // 说明找到了，数据库有就不允许在添加了
    if (res1.length) {
      return true
    }

    const res = actionAdd.call(mysqlSqlEncapsulation, 'user', {
      username,
      password,
      role,
      createTime
    })
    return res
  }

  // 修改
  updateUser({ id, username, role }: IUserInfo) {
    const obj: IUserInfo = {}
    username && (obj.username = username)
    role && (obj.role = role)
    const res = actionUpdate.call(mysqlSqlEncapsulation, 'user', obj, ['id', id!])

    return res
  }

  // 删除
  deleteUser({ id }: { id: number }) {
    const res = actionDelete('user', ['id', id])
    return res
  }

  // 分页
  pageUser(data: Page) {
    const res = actionPage('user', data)
    return res
  }

  // 重置密码
  resetUser(id: number, newPassword: string) {
    const res = mysqlSqlEncapsulation.actionUpdate('user', { password: newPassword }, ['id', id])
    return res
  }
}

export default new UserServices
