/**
 * 外出报备
 */
import mysql from "../utils/mysql"
import pool from '../dataBase'

import type { IGoOutInfo, Page } from "../global/types" 

class GoOutServices {
  // 新增
  addGoOutS(data: IGoOutInfo) {
    const res = mysql.actionAdd('go_out', data)
    return res
  }

  // 编辑
  editGoOutS(data: IGoOutInfo) {
    const res = mysql.actionUpdate('go_out', data, ['id', data.id!])
    return res
  }

  // 删除
  deleteGoOutS(id: number) {
    const res = mysql.actionDelete('go_out', ['id', id])
    return res
  }

  // 分页
  async pageGoOutS(data: Page) {
    const { current, pageSize, oldPersonId, goOutEvent = '' } = data

    let sql = ''
    if (oldPersonId !== undefined && oldPersonId !== null && oldPersonId !== '') {
      sql = `AND o.id = ${oldPersonId} `
    }
    let sql1 = ''
    if (goOutEvent !== undefined && goOutEvent !== null && goOutEvent !== '') {
      sql1 = `AND g.goOutEvent like '%${goOutEvent}%' `
    }
    
    // 病例，老人名字允许模糊查询
    const statement = `
      SELECT g.*, o.oldPersonName, o.gender, o.phone, o.familyMemberPhone 
			FROM go_out g, old_person o 
			WHERE g.oldPersonId = o.id 
      ${sql}
      ${sql1} 
      LIMIT ${((current || 1) - 1) * (pageSize || 10)},${pageSize || 10}
    `
    const statementTotal = `
      SELECT COUNT(*)
			FROM go_out g, old_person o 
			WHERE g.oldPersonId = o.id 
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

export default new GoOutServices()
