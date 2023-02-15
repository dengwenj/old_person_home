/**
 * 入住管理
 */
import mysql from "../utils/mysql"
import pool from '../dataBase'

import type { ILifeInfo, Page } from "../global/types" 

class LifeServices {
  // 新增
  addLifeS(data: ILifeInfo) {
    const res = mysql.actionAdd('life', data)
    return res
  }

  // 编辑
  editLifeS(data: ILifeInfo) {
    const res = mysql.actionUpdate('life', data, ['id', data.id!])
    return res
  }

  // 删除
  deleteLifeS(id: number) {
    const res = mysql.actionDelete('life', ['id', id])
    return res
  }

  // 分页
  async pageLifeS(data: Page) {
    const { current, pageSize, oldPersonId } = data

    let sql = ''
    if (oldPersonId !== undefined && oldPersonId !== null) {
      sql = `AND o.id = ${oldPersonId} `
    }
    
    // 老人名字允许模糊查询
    const statement = `
      SELECT l.*, o.oldPersonName, o.gender, o.birthDate, o.address, b.bedroomNum
			FROM life l, old_person o, bedroom b
			WHERE l.oldPersonId = o.id 
      AND b.id = l.bedroomId
      ${sql}
      LIMIT ${((current || 1) - 1) * (pageSize || 10)},${pageSize || 10}
    `
    const statementTotal = `SELECT * FROM life`
    try {
      const res = await pool.execute(statement)
      const res1: any = await pool.execute(statementTotal)
      
      return {
        data: res[0],
        total: res1[0].length
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export default new LifeServices()
