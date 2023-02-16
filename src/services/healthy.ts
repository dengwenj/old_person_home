import mysql from "../utils/mysql"
import pool from '../dataBase'

import type { IHealthyInfo, Page } from "../global/types"

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

  // 健康档案分页
  async pageHealthyS(data: Page) {
    const { current, pageSize, oldPersonId, PETime = '', gender } = data
    let sql = ''
    let sql1 = ''
    if (gender !== undefined && gender !== null && gender !== '') {
      sql = `AND o.gender like '%${gender}%'`
    } 
    if (oldPersonId !== undefined && oldPersonId !== null && oldPersonId !== '') {
      sql1 = `AND o.id = ${oldPersonId} `
    }
    
    // 体检时间，性别，老人名字允许模糊查询
    const statement = `
      SELECT h.*, o.oldPersonName, o.gender, o.birthDate 
			FROM healthy h, old_person o 
			WHERE h.oldPersonId = o.id 
      ${sql1}
      ${sql}
      LIMIT ${((current || 1) - 1) * (pageSize || 10)},${pageSize || 10}
    `
    const statementTotal = `
      SELECT COUNT(*)
			FROM healthy h, old_person o 
			WHERE h.oldPersonId = o.id 
      ${sql1}
      ${sql}
    `
    const res = await pool.execute(statement)
    const res1: any = await pool.execute(statementTotal)
    
    return {
      data: res[0],
      total: res1[0][0]['COUNT(*)']
    }
  }
}

export default new HealthyServices()
