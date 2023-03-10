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
    const { current, pageSize, oldPersonId, bedroomId } = data

    let sql = ''
    if (oldPersonId !== undefined && oldPersonId !== null && oldPersonId !== '') {
      sql = `AND o.id = ${oldPersonId} `
    }
    let sql2 = ''
    if (bedroomId !== undefined && bedroomId !== null && bedroomId !== '') {
      sql2 = `AND l.bedroomId = ${bedroomId} `
    }
    
    // 老人名字允许模糊查询
    const statement = `
      SELECT l.*, o.oldPersonName, o.gender, o.birthDate, o.address, b.bedroomNum, b.price
			FROM life l, old_person o, bedroom b
			WHERE l.oldPersonId = o.id 
      AND b.id = l.bedroomId
      ${sql}
      ${sql2}
      LIMIT ${((current || 1) - 1) * (pageSize || 10)},${pageSize || 10}
    `
    const statementTotal = `
      SELECT COUNT(*)
			FROM life l, old_person o, bedroom b
			WHERE l.oldPersonId = o.id 
      AND b.id = l.bedroomId
      ${sql}
      ${sql2}
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

  // 获取全部入住人员
  async getAllS() {
    const res = mysql.actionQuery('life');
    return res
  }
}

export default new LifeServices()
