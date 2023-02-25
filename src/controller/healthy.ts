import { healthyServices } from '../services'
import ErrorTypes from '../global/constants/error_types'

import type { Next, ParameterizedContext } from "koa"
import type { IHealthyInfo, Page } from "../global/types"

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
    const {
      bloodOxygen,
      heartRate,
      bloodPressure,
    } = ctx.request.body as IHealthyInfo
    if (!edit.id) {
      ctx.app.emit('error', ErrorTypes.REQUIRE_HAVA_VALUE, ctx)
      return
    }

    let des = ''
    // 说明血氧正常
    if (Number(bloodOxygen!) <= 100 && Number(bloodOxygen!) >= 95) {
      des += '血氧正常,'
    } else if (Number(bloodOxygen!) < 95) {
      // 血氧过低
      des += '血氧过低,'
    } else {
      des += '血氧过高,'
    }
    // 心率
    if (Number(heartRate!) <= 100 && Number(heartRate!) >= 60) {
      des += '心率正常,'
    } else if (Number(heartRate!) < 60) {
      des += '心动过缓,'
    } else {
      des += '心动过快,'
    }
    // 血压
    if (Number(bloodPressure!) <= 140 && Number(bloodPressure!) >= 90) {
      des += '血压正常'
    } else if (Number(bloodPressure!) < 90) {
      des += '血压过低'
    } else {
      des += '血压过高'
    }

    edit.healthyDes = des
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
    const data = ctx.request.body as Page

    const res = await healthyServices.pageHealthyS(data)
    ctx.body = {
      msg: '查询成功',
      data: res?.data,
      total: res?.total
    }
  }
}

export default new HealthyController()
