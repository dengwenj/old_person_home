/**
 * 封装 mysql 语句
 */
import pool from '../dataBase'

import type { Page } from '../global/types'

class MySQLSqlEncapsulation {
  /**
   * 新增
   */
  async actionAdd(
    tableName: string, 
    fieldsAndValue: Record<string, any>
  ) {
    const { 
      fieldsArr,
      questionMark, 
      valuesArr 
    } = this.addUpdateCommon(true, fieldsAndValue)
    
    // INSERT INTO user (username,password) VALUES (?,?)
    const statement = `
      INSERT INTO ${tableName} (${fieldsArr.join(',')})
      VALUES (${questionMark.join(',')})
    `
    try {
      const res = await pool.execute(statement, valuesArr)
      return res[0]
    } catch (error) {
      console.log(error)
    }
  }

  /**
   * 更新
   */
  async actionUpdate(
    tableName: string, 
    fieldsAndValue: Record<string, any>,
    whoFieldUpdate?: [string, string | number]
  ) {
    const { questionMark, valuesArr } = this.addUpdateCommon(false, fieldsAndValue)

    // 通过哪个字段去修改  UPDATE user SET username = ? WHERE id = 1
    const statement = `
      UPDATE ${tableName} SET ${questionMark.join(',')}
      ${whoFieldUpdate && `WHERE ${whoFieldUpdate[0]} = ${whoFieldUpdate[1]}`}
    `
    try {
      const res = await pool.execute(statement, valuesArr)
      return res[0]
    } catch (error) {
      console.log(error)
    }
  }

  /**
   * 删除
   */
  async actionDelete(
    tableName: string, 
    whoFieldDelete: [string, string | number]
  ) {
    // DELETE FROM `user` WHERE id = 4;
    const statement = `
      DELETE FROM ${tableName}
      ${whoFieldDelete ? `WHERE ${whoFieldDelete[0]} = ${whoFieldDelete[1]}` : ''}
    `
    try {
      const res = await pool.execute(statement)
      return res[0]
    } catch (error) {
      console.log(error)
    }
  }

  /**
   * 分页
   */
  async actionPage(
    tableName: string,
    data: Page
  ) {
    const fuzzyFieldsAndValue = { ...data }
    delete fuzzyFieldsAndValue.current
    delete fuzzyFieldsAndValue.pageSize

    // 如果值为(undefined、null)就删除、边界判断
    const fieldsAllArr = Object.keys(fuzzyFieldsAndValue)
    for (const key of fieldsAllArr) {
      if (fuzzyFieldsAndValue[key] === undefined || fuzzyFieldsAndValue[key] === null) {
        delete fuzzyFieldsAndValue[key]
      }
    }

    // 删除之后的 fields 数组
    const fieldsArr = Object.keys(fuzzyFieldsAndValue)
    let sql = ''
    // 如果有模糊查询不为0
    if (fieldsArr.length) {
      // 说明只有一个模糊查询
      if (fieldsArr.length === 1) {
        const field = fieldsArr[0]
        sql = `WHERE ${field} LIKE '%${fuzzyFieldsAndValue[field]}%'`
      } else {
        // 多个模糊查询
        for (let i = 0; i < fieldsArr.length; i++) {
          sql += `
            ${fieldsArr[i]} LIKE '%${fuzzyFieldsAndValue[fieldsArr[i]]}%' 
            ${i !== fieldsArr.length - 1 ? 'and' : ''}
          `
        }
        // WHERE username like '%h%' and password like '%12%'
        sql = `WHERE ${sql}`
      }
    }
  
    const { current, pageSize } = data
    const statement = `
      SELECT * FROM ${tableName} 
      ${sql}
      LIMIT ${((current || 1) - 1) * (pageSize || 10)},${pageSize || 10}
    `
    const totalStatement = `
      SELECT COUNT(*) FROM ${tableName} 
      ${sql}
    `
    try {
      const res = await pool.execute(statement)
      // 查询 total
      const res1: any[] = await pool.execute(totalStatement)
      return {
        data: res[0],
        total: res1[0][0]['COUNT(*)']
      }
    } catch (error) {
      console.log(error)
    }
  }

  /**
   * 查询
   */
  async actionQuery(tableName: string, condition?: string) {
    const statement = `
      SELECT * FROM ${tableName}
      ${condition ? `WHERE ${condition}` : ''}
    `
    try {
      const res = await pool.execute(statement)
      return res[0]
    } catch (error) {
      console.log(error)
    }
  }

  private addUpdateCommon(isAdd: boolean, fieldsAndValue: Record<string, any>) {
    // 如果值为(undefined、null)就删除、边界判断
    Object.keys(fieldsAndValue).forEach((key) => {
      if (fieldsAndValue[key] === undefined || fieldsAndValue[key] === null) {
        delete fieldsAndValue[key]
      }
    })

    const fieldsArr = Object.keys(fieldsAndValue)
    const valuesArr: any[] = []
    const questionMark: string[] = []
    for (const key of fieldsArr) {
      // 有多少个字段就有多少个问号
      questionMark.push(isAdd ? '?' : `${key} = ?`) 
      // 获取值
      valuesArr.push(fieldsAndValue[key])
    }

    return {
      fieldsArr,
      valuesArr,
      questionMark
    }
  }
}

export default new MySQLSqlEncapsulation
