/**
 * 作息管理
 */
import ErrorTypes from '../global/constants/error_types'
import { workRestServices } from '../services'

import type { ParameterizedContext, Next } from 'koa'
import type { IWorkRest, Page } from '../global/types'

class WorkRestController {
  // 新增
  async addWorkRestC(ctx: ParameterizedContext, next: Next) {
    const {
      season,
      sevenEight,
      eightNine,
      nineTen,
      tenEleven,
      elevenTwelve,
      twelveFourteen,
      fourteenSeventeen,
      seventeenNineteen,
      nineteenTwentyone,
      twentyoneAfter,
      slogan
    } = ctx.request.body as IWorkRest
    // 必须有值
    const fieldsArr = [
      season,
      sevenEight,
      eightNine,
      nineTen,
      tenEleven,
      elevenTwelve,
      twelveFourteen,
      fourteenSeventeen,
      seventeenNineteen,
      nineteenTwentyone,
      twentyoneAfter,
      slogan
    ]
    for (const field of fieldsArr) {
      if (field === '' || field === undefined || field === null) {
        ctx.app.emit('error', ErrorTypes.REQUIRE_HAVA_VALUE, ctx)
        return
      }
    }

    await workRestServices.addWorkRestS(ctx.request.body as IWorkRest)
    ctx.body = {
      msg: '新增成功'
    }
  }

  // 编辑
  async editWorkRestC(ctx: ParameterizedContext, next: Next) {
    const { id } = ctx.request.body as IWorkRest
    if (!id) {
      ctx.app.emit('error', ErrorTypes.REQUIRE_HAVA_VALUE, ctx)
      return
    }

    await workRestServices.editWorkRestS(ctx.request.body as IWorkRest)
    ctx.body = {
      msg: '编辑成功'
    }
  }

  // 删除
  async deleteWorkRestC(ctx: ParameterizedContext, next: Next) {
    const { id } = ctx.request.body as { id: number }
    if (!id) {
      ctx.app.emit('error', ErrorTypes.REQUIRE_HAVA_VALUE, ctx)
      return
    }

    await workRestServices.deleteWorkRestS(id)
    ctx.body = {
      msg: '删除成功'
    }
  }

  // 分页
  async pageWorkRestC(ctx: ParameterizedContext, next: Next) {
    const data = ctx.request.body as Page

    const res = await workRestServices.pageWorkRestS(data)
    ctx.body = {
      data: res?.data,
      total: res?.total,
      msg: '查询成功',
    }
  }
}

export default new WorkRestController()
