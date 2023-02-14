/**
 * 作息管理
 */
import mysql from '../utils/mysql'

import type { IWorkRest, Page } from '../global/types'

class WorkRestServices {
  // 新增
  addWorkRestS(data: IWorkRest) {
    const res = mysql.actionAdd('work_rest', data)
    return res
  }

  // 编辑
  editWorkRestS(data: IWorkRest) {
    const res = mysql.actionUpdate('work_rest', data, ['id', data.id!])
    return res
  }

  // 删除
  deleteWorkRestS(id: number) {
    const res = mysql.actionDelete('work_rest', ['id', id])
    return res
  }

  // 分页
  pageWorkRestS(data: Page) {
    const res = mysql.actionPage('work_rest', data)
    return res
  }
}

export default new WorkRestServices()
