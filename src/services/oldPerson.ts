import mysqlSqlEncapsulation from '../utils/mysql'

import type { IOldPersonInfo } from '../global/types'

class OldPersonServices {
  // 人员新增塞入数据库
  addOldPersonS(oldPersonInfo: IOldPersonInfo) {
    const res = mysqlSqlEncapsulation.actionAdd('old_person', oldPersonInfo)
    return res
  }

  // 人员编辑
  updateOldPersonS(oldPersonInfo: IOldPersonInfo) {
    const res = mysqlSqlEncapsulation.actionUpdate(
      'old_person', 
      oldPersonInfo, 
      ['id', oldPersonInfo.id!]
    )
    return res
  }
}

export default new OldPersonServices()