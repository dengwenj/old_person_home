/**
 * 护工管理
 */
import { careWorkerServices } from '../services'
import ErrorTypes from '../global/constants/error_types'

import type { ParameterizedContext, Next } from 'koa'
import type { ICareWorkerInfo, Page } from '../global/types'
import { nameAsterisk } from '../utils/tool'

class CareWorkerController {
  // 新增
  async addCareWorkerC(ctx: ParameterizedContext, next: Next) {
    const {
      careWorkerName,
      carWorkerPrice,
      careWorkerAge,
      isHealthy,
      seniority
    } = ctx.request.body as ICareWorkerInfo

    // 必须有值
    const fieldsArr = [careWorkerName, carWorkerPrice, careWorkerAge, isHealthy, seniority]
    for (const field of fieldsArr) {
      if (field === '' || field === undefined || field === null) {
        ctx.app.emit('error', ErrorTypes.REQUIRE_HAVA_VALUE, ctx)
        return
      }
    }

    await careWorkerServices.addCareWorkerS(ctx.request.body as ICareWorkerInfo)
    ctx.body = {
      msg: '新增成功'
    }
  }

  // 编辑 
  async editCareWorkerC(ctx: ParameterizedContext, next: Next) {
    const { id } = ctx.request.body as ICareWorkerInfo
    if (!id) {
      ctx.app.emit('error', ErrorTypes.REQUIRE_HAVA_VALUE, ctx)
      return
    }

    await careWorkerServices.editCareWorkerS(ctx.request.body as ICareWorkerInfo)
    ctx.body = {
      msg: '编辑成功'
    }
  }

  // 删除
  async deleteCareWorkerC(ctx: ParameterizedContext, next: Next) {
    const { id } = ctx.request.body as { id: number }
    if (!id) {
      ctx.app.emit('error', ErrorTypes.REQUIRE_HAVA_VALUE, ctx)
      return
    }

    await careWorkerServices.deleteCareWorkerS(id)
    ctx.body = {
      msg: '删除成功'
    }
  }

  // 分页
  async pageCareWorkerC(ctx: ParameterizedContext, next: Next) {
    const data = ctx.request.body as Page

    const res = await careWorkerServices.pageCareWorkerS(data)
    const data1 = (res?.data as Record<string, any>[]).map((item) => {
      return {
        ...item,
        careWorkerName: nameAsterisk(item.careWorkerName),
        oldPersonName: nameAsterisk(item.oldPersonName),
      }
    })
    ctx.body = {
      msg: '查询成功',
      data: data1,
      total: res?.total
    }
  }
}

export default new CareWorkerController()
