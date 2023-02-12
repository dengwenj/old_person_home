import { healthyServices } from '../services'
import ErrorTypes from '../global/constants/error_types'

import type { Next, ParameterizedContext } from "koa"
import type { IHealthyInfo } from "../global/types"

class HealthyController {
  // 健康档案新增
  async addHealthyC(ctx: ParameterizedContext, next: Next) {
    await healthyServices.addHealthyS(ctx.request.body as IHealthyInfo)
    ctx.body = {
      msg: '新增成功'
    }
  }
  // 健康档案编辑
  async updateHealthyC(ctx: ParameterizedContext, next: Next) {
    const edit = ctx.request.body as IHealthyInfo
    if (!edit.id) {
      ctx.app.emit('error', ErrorTypes.REQUIRE_HAVA_VALUE, ctx)
      return
    }

    await healthyServices.updateHealthyS(edit)
    ctx.body = {
      msg: '更新成功'
    }
  }

  // 健康档案删除
  async deleteHealthyC(ctx: ParameterizedContext, next: Next) {
    const { id } = ctx.request.body as { id: number }
    if (!id) {
      ctx.app.emit('error', ErrorTypes.REQUIRE_HAVA_VALUE, ctx)
      return
    }

    await healthyServices.daleteHealthyS(id)
    ctx.body = {
      msg: '删除成功'
    }
  }

  // 分页
  async pageHealthyC(ctx: ParameterizedContext, next: Next) {
  }
}

export default new HealthyController()
