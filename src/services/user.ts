import mysqlSqlEncapsulation from '../utils/mysql'

import type { IUserInfo } from '../global/types'

const { 
  actionAdd, 
  actionUpdate,
  actionDelete
} = mysqlSqlEncapsulation

class UserServices {
  // 新增
  create({ username, password }: IUserInfo) {
    const res = actionAdd('user', {
      username,
      password
    })
    return res
  }

  // 修改
  updateUser({ id, username }: IUserInfo) {
    const res = actionUpdate('user', {
      username
    }, ['id', id!])

    return res
  }

  // 删除
  deleteUser({ id }: { id: number }) {
    const res = actionDelete('user', ['id', id])
    return res
  }
}

export default new UserServices
