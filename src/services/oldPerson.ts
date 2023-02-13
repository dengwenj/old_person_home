import mysqlSqlEncapsulation from '../utils/mysql'

import type { 
  IHealthyInfo, 
  IOldPersonInfo, 
  Page,
  ICasesInfo
} from '../global/types'

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
  async deleteOldPersonS(id: number) {
    // 人员删除了，健康档案也要跟着删除
    // 通过人员 id 拿到健康档案的数据
    const getHealthyList = await mysqlSqlEncapsulation.actionQuery(
      'healthy',
      `oldPersonId = '${id}'`
    ) as IHealthyInfo[]
    // 删除健康档案数据
    for (const item of getHealthyList) {
      await mysqlSqlEncapsulation.actionDelete(
        'healthy',
        ['id', item.id!]
      )
    }

    // 病例档案也要跟着删除, 通过人员 id 拿到病例档案
    const getCasesList = await mysqlSqlEncapsulation.actionQuery(
      'cases',
      `oldPersonId = '${id}'`
    ) as ICasesInfo[]
    for (const item of getCasesList) {
      await mysqlSqlEncapsulation.actionDelete(
        'cases',
        ['id', item.id!]
      )
    }
    
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
