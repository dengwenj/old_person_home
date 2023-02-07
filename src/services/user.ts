import mysqlSqlEncapsulation from '../utils/mysql'

import type { IUserInfo } from '../global/types'
import type { Page } from '../global/types' 

const { 
  actionAdd, 
  actionUpdate,
  actionDelete,
  actionPage
} = mysqlSqlEncapsulation

class UserServices {
  // 新增
  create({ username, password, role }: IUserInfo) {
    const res = actionAdd.call(mysqlSqlEncapsulation, 'user', {
      username,
      password,
      role
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
}

export default new UserServices
