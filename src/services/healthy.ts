import mysql from "../utils/mysql"

import type { IHealthyInfo } from "../global/types"

class HealthyServices {
  // 健康档案新增
  async addHealthyS(healthyInfo: IHealthyInfo) {
    const res = mysql.actionAdd('healthy', healthyInfo)
    return res
  }

  // 健康档案编辑
  async updateHealthyS(editInfo: IHealthyInfo) {
    const res = mysql.actionUpdate(
      'healthy', 
      editInfo, 
      ['id', editInfo.id!]
    )
    return res
  }

  // 健康档案删除
  async daleteHealthyS(id: number) {
    const res = mysql.actionDelete('healthy', ['id', id])
    return res
  }
}

export default new HealthyServices()