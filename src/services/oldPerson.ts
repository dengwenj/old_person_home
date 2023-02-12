import mysqlSqlEncapsulation from '../utils/mysql'

import type { IOldPersonInfo, Page } from '../global/types'

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

  // 删除
  deleteOldPersonS(id: number) {
    const res = mysqlSqlEncapsulation.actionDelete('old_person', ['id', id])
    return res
  }

  // 分页
  pageOldPersonS(data: Page) {
    const res = mysqlSqlEncapsulation.actionPage('old_person', data)
    return res
  }

  // 通过人员拿到人员列表
  getOldpersonByNameS(oldPersonName: string) {
    const res = mysqlSqlEncapsulation.actionQuery(
      'old_person', 
      `oldPersonName like '%${oldPersonName}%'`
    )
    return res
  }
}

export default new OldPersonServices()