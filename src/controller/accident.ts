/**
 * 事故管理
 */
import { accidentServices } from '../services'
import ErrorTypes from '../global/constants/error_types'

import type { ParameterizedContext, Next } from 'koa'
import type { IAccidentInfo, Page } from '../global/types'

class AccidentController {
  // 新增
  async addAccidentC(ctx: ParameterizedContext, next: Next) {
    const {
      accident,
      accidentTime,
      reason,
      loss
    } = ctx.request.body as IAccidentInfo
    // 必须有值
    const fieldsArr = [accident, accidentTime, reason, loss]
    for (const field of fieldsArr) {
      if (field === '' || field === undefined || field === null) {
        ctx.app.emit('error', ErrorTypes.REQUIRE_HAVA_VALUE, ctx)
        return
      }
    }

    await accidentServices.addAccidentS(ctx.request.body as IAccidentInfo)
    ctx.body = {
      msg: '新增成功'
    }
  }

  // 编辑
  async editAccidentC(ctx: ParameterizedContext, next: Next) {
    const { id } = ctx.request.body as IAccidentInfo
    if (!id) {
      ctx.app.emit('error', ErrorTypes.REQUIRE_HAVA_VALUE, ctx)
      return
    }

    await accidentServices.editAccidentS(ctx.request.body as IAccidentInfo)
    ctx.body = {
      msg: '编辑成功'
    }
  }

  // 删除
  async deleteAccidentC(ctx: ParameterizedContext, next: Next) {
    const { id } = ctx.request.body as { id: number }
    if (!id) {
      ctx.app.emit('error', ErrorTypes.REQUIRE_HAVA_VALUE, ctx)
      return
    }

    await accidentServices.deleteAccidentS(id)
    ctx.body = {
      msg: '删除成功'
    }
  }

  // 分页
  async pagAccidentC(ctx: ParameterizedContext, next: Next) {
    const data = ctx.request.body as Page

    const res = await accidentServices.pageAccidentS(data)
    ctx.body = {
      msg: '查询成功',
      data: res?.data,
      total: res?.total
    }
  }
}

export default new AccidentController()
