/**
 * 寝室管理
 */
import mysql from "../utils/mysql"

import type { IBedroomInfo, Page } from "../global/types" 

class BedroomServices {
  // 新增
  addBedroomS(data: IBedroomInfo) {
    const res = mysql.actionAdd('bedroom', data)
    return res
  }

  // 编辑
  editBedroomS(data: IBedroomInfo) {
    const res = mysql.actionUpdate('bedroom', data, ['id', data.id!])
    return res
  }

  // 删除
  deleteBedroomS(id: number) {
    const res = mysql.actionDelete('bedroom', ['id', id])
    return res
  }

  // 分页
  async pageBedroomS(data: Page) {
    const res = mysql.actionPage('bedroom', data)
    return res
  }

  // 通过寝室号查找寝室（模糊查询）
  async bedroomNumByBedroomS(num: string) {
    const res = mysql.actionQuery('bedroom', `bedroomNum like '%${num}%'`)
    return res
  }
}

export default new BedroomServices()
