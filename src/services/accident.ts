/**
 * 事故管理
 */
import mysql from '../utils/mysql'

import type { IAccidentInfo, Page } from '../global/types'

class AccidentServices {
  // 新增
  addAccidentS(data: IAccidentInfo) {
    const res = mysql.actionAdd('accident', data)
    return res
  }

  // 编辑
  editAccidentS(data: IAccidentInfo) {
    const res = mysql.actionUpdate('accident', data, ['id', data.id!])
    return res
  }

  // 删除
  deleteAccidentS(id: number) {
    const res = mysql.actionDelete('accident', ['id', id])
    return res
  }

  // 分页
  pageAccidentS(data: Page) {
    const res = mysql.actionPage('accident', data)
    return res
  }
}

export default new AccidentServices()
