/**
 * 病例管理
 */
import mysql from "../utils/mysql"

import type { ICasesInfo } from "../global/types" 

class CasesServices {
  // 新增
  addCasesS(data: ICasesInfo) {
    const res = mysql.actionAdd('cases', data)
    return res
  }

  // 编辑
  editCasesS() {

  }

  // 删除
  deleteCasesS() {

  }

  // 分页
  pageCasesS() {

  }
}

export default new CasesServices()
