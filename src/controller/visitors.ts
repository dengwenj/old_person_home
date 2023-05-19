/**
 * 访客管理
 */
import { visitorsServices } from '../services'
import ErrorTypes from '../global/constants/error_types'

import type { ParameterizedContext, Next } from 'koa'
import type { IVisitorsInfo, Page } from '../global/types'
import { nameAsterisk, phoneAsterisk } from '../utils/tool'

class VisitorsController {
  // 新增
  async addVisitorsC(ctx: ParameterizedContext, next: Next) {
    const {
      oldPersonId,
      visitorsEvent,
      visitorsName,
      visitorsPhone,
      relation,
      accessTime
    } = ctx.request.body as IVisitorsInfo
    // 必须有值
    const fieldsArr = [oldPersonId, visitorsEvent, visitorsName, visitorsPhone, relation, accessTime]
    for (const field of fieldsArr) {
      if (field === '' || field === undefined || field === null) {
        ctx.app.emit('error', ErrorTypes.REQUIRE_HAVA_VALUE, ctx)
        return
      }
    }

    await visitorsServices.addVisitorsS(ctx.request.body as IVisitorsInfo)
    ctx.body = {
      msg: '新增成功'
    }
  }

  // 编辑
  async editVisitorsC(ctx: ParameterizedContext, next: Next) {
    const { id } = ctx.request.body as IVisitorsInfo
    if (!id) {
      ctx.app.emit('error', ErrorTypes.REQUIRE_HAVA_VALUE, ctx)
      return
    }

    await visitorsServices.editVisitorsS(ctx.request.body as IVisitorsInfo)
    ctx.body = {
      msg: '编辑成功'
    }
  }

  // 删除
  async deleteVisitorsC(ctx: ParameterizedContext, next: Next) {
    const { id } = ctx.request.body as { id: number }
    if (!id) {
      ctx.app.emit('error', ErrorTypes.REQUIRE_HAVA_VALUE, ctx)
      return
    }

    await visitorsServices.deleteVisitorsS(id)
    ctx.body = {
      msg: '删除成功'
    }
  }

  // 分页
  async pageVisitorsC(ctx: ParameterizedContext, next: Next) {
    const data = ctx.request.body as Page

    const res = await visitorsServices.pageVisitorsS(data)
    const data1 = (res?.data as Record<string, any>[]).map((item) => {
      return {
        ...item,
        oldPersonName: nameAsterisk(item.oldPersonName),
        visitorsPhone: phoneAsterisk(item.visitorsPhone),
        visitorsName: nameAsterisk(item.visitorsName)
      }
    })
    ctx.body = {
      msg: '查询成功',
      data: data1,
      total: res?.total
    }
  }
}

export default new VisitorsController()
