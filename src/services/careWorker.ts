/**
 * 护工管理
 */
import mysql from "../utils/mysql"

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
    const res = mysql.actionPage('care_worker', data)
    return res
  }
}

export default new CareWorkerServices()
