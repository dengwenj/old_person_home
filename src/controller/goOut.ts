/**
 * 外出报备
 */
import { goOutServices } from '../services'
import ErrorTypes from '../global/constants/error_types'

import type { ParameterizedContext, Next } from 'koa'
import type { IGoOutInfo, Page } from '../global/types'

class GoOutController {
  // 新增
  async addGoOutC(ctx: ParameterizedContext, next: Next) {
    const {
      oldPersonId,
      goOutTime,
      goOutAddress,
      goOutEvent
    } = ctx.request.body as IGoOutInfo
    // 必须有值
    const fieldsArr = [oldPersonId, goOutTime, goOutAddress, goOutEvent]
    for (const field of fieldsArr) {
      if (field === '' || field === undefined || field === null) {
        ctx.app.emit('error', ErrorTypes.REQUIRE_HAVA_VALUE, ctx)
        return
      }
    }

    await goOutServices.addGoOutS(ctx.request.body as IGoOutInfo)
    ctx.body = {
      msg: '新增成功'
    }
  }

  // 编辑
  async editGoOutC(ctx: ParameterizedContext, next: Next) {
    const { id } = ctx.request.body as IGoOutInfo
    if (!id) {
      ctx.app.emit('error', ErrorTypes.REQUIRE_HAVA_VALUE, ctx)
      return
    }

    await goOutServices.editGoOutS(ctx.request.body as IGoOutInfo)
    ctx.body = {
      msg: '编辑成功'
    }
  }

  // 删除
  async deleteGoOutC(ctx: ParameterizedContext, next: Next) {
    const { id } = ctx.request.body as { id: number }
    if (!id) {
      ctx.app.emit('error', ErrorTypes.REQUIRE_HAVA_VALUE, ctx)
      return
    }

    await goOutServices.deleteGoOutS(id)
    ctx.body = {
      msg: '删除成功'
    }
  }

  // 分页
  async pageGoOutC(ctx: ParameterizedContext, next: Next) {
    const data = ctx.request.body as Page

    const res = await goOutServices.pageGoOutS(data)
    ctx.body = {
      msg: '查询成功',
      data: res?.data,
      total: res?.total
    }
  }
}

export default new GoOutController()
