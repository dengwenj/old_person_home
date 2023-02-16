/**
 * 访客管理
 */
import mysql from "../utils/mysql"
import pool from '../dataBase'

import type { IVisitorsInfo, Page } from "../global/types" 

class VisitorsServices {
  // 新增
  addVisitorsS(data: IVisitorsInfo) {
    const res = mysql.actionAdd('visitors', data)
    return res
  }

  // 编辑
  editVisitorsS(data: IVisitorsInfo) {
    const res = mysql.actionUpdate('visitors', data, ['id', data.id!])
    return res
  }

  // 删除
  deleteVisitorsS(id: number) {
    const res = mysql.actionDelete('visitors', ['id', id])
    return res
  }

  // 分页
  async pageVisitorsS(data: Page) {
    const { current, pageSize, oldPersonId, visitorsName } = data

    let sql = ''
    if (oldPersonId !== undefined && oldPersonId !== null && oldPersonId !== '') {
      sql = `AND o.id = ${oldPersonId} `
    }
    let sql1 = ''
    if (visitorsName !== undefined && visitorsName !== null && visitorsName !== '') {
      sql1 = `AND v.visitorsName like '%${visitorsName}%'  `
    }
    
    // 病例，老人名字允许模糊查询
    const statement = `
      SELECT v.*, o.oldPersonName, o.gender, o.age
			FROM visitors v, old_person o 
			WHERE v.oldPersonId = o.id 
      ${sql}
      ${sql1}
      LIMIT ${((current || 1) - 1) * (pageSize || 10)},${pageSize || 10}
    `
    
    const statementTotal = `
      SELECT COUNT(*)
			FROM visitors v, old_person o 
			WHERE v.oldPersonId = o.id 
      ${sql}
      ${sql1}
    `
    try {
      const res = await pool.execute(statement)
      const res1: any = await pool.execute(statementTotal)
      
      return {
        data: res[0],
        total: res1[0][0]['COUNT(*)']
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export default new VisitorsServices()
