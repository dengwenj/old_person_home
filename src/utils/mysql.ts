/**
 * 封装 mysql 语句
 */
import pool from '../dataBase'

class mysqlSqlEncapsulation {
  /**
   * 新增
   */
  async actionAdd(
    tableName: string, 
    fieldsAndValue: Record<string, any>
  ) {
    const fieldsArr = Object.keys(fieldsAndValue)
    const valuesArr: any[] = []
    const questionMark: string[] = []
    for (const key of fieldsArr) {
      // 有多少个字段就有多少个问号
      questionMark.push('?')
      // 获取值
      valuesArr.push(fieldsAndValue[key])
    }
    
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
    const fieldsArr = Object.keys(fieldsAndValue)
    const fieldsAndQuestionMark: string[] = []
    const valuesArr: any[] = []
    for (const key of fieldsArr) {
      fieldsAndQuestionMark.push(`${key} = ?`)
      valuesArr.push(fieldsAndValue[key])
    }

    // 通过哪个字段去修改  UPDATE user SET username = ? WHERE id = 1
    const statement = `
      UPDATE ${tableName} SET ${fieldsAndQuestionMark.join(',')}
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
      ${whoFieldDelete && `WHERE ${whoFieldDelete[0]} = ${whoFieldDelete[1]}`}
    `
    try {
      const res = await pool.execute(statement)
      return res[0]
    } catch (error) {
      console.log(error)
    }
  }
}

export default new mysqlSqlEncapsulation
