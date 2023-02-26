/**
 * 护工管理
 */
import mysql from "../utils/mysql"
import pool from '../dataBase'

import type { ICareWorkerInfo, Page } from "../global/types" 

class CareWorkerServices {
  // 新增
  addCareWorkerS(data: ICareWorkerInfo) {
    const res = mysql.actionAdd('care_worker', data)
    return res
  }

  // 编辑
  editCareWorkerS(data: ICareWorkerInfo) {
    const res = mysql.actionUpdate('care_worker', data, ['id', data.id!])
    return res
  }

  // 删除
  deleteCareWorkerS(id: number) {
    const res = mysql.actionDelete('care_worker', ['id', id])
    return res
  }

  // 分页
  async pageCareWorkerS(data: Page) {
    const { current, pageSize, oldPersonId, careWorkerName } = data

    let sql = ''
    if (oldPersonId !== undefined && oldPersonId !== null && oldPersonId !== '') {
      sql = `AND o.id = ${oldPersonId} `
    }
    let sql1 = ''
    if (careWorkerName !== undefined && careWorkerName !== null && careWorkerName !== '') {
      sql1 = `AND c.careWorkerName like '%${careWorkerName}%'  `
    }
    
    // 病例，老人名字允许模糊查询
    const statement = `
      SELECT c.*, o.oldPersonName, o.gender, o.age
			FROM care_worker c, old_person o 
			WHERE c.oldPersonId = o.id 
      ${sql}
      ${sql1}
      LIMIT ${((current || 1) - 1) * (pageSize || 10)},${pageSize || 10}
    `
    
    const statementTotal = `
      SELECT COUNT(*)
			FROM care_worker c, old_person o 
			WHERE c.oldPersonId = o.id 
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

export default new CareWorkerServices()
