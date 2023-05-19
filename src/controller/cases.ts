/**
 * 病例管理
 */
import { casesServices } from '../services'
import ErrorTypes from '../global/constants/error_types'

import type { ParameterizedContext, Next } from 'koa'
import type { ICasesInfo, Page } from '../global/types'
import { nameAsterisk } from '../utils/tool'

class CasesController {
  // 新增
  async addCasesC(ctx: ParameterizedContext, next: Next) {
    const {
      oldPersonId,
      cases,
      fallIllTime,
    } = ctx.request.body as ICasesInfo
    // 必须有值
    const fieldsArr = [oldPersonId, cases, fallIllTime]
    for (const field of fieldsArr) {
      if (field === '' || field === undefined || field === null) {
        ctx.app.emit('error', ErrorTypes.REQUIRE_HAVA_VALUE, ctx)
        return
      }
    }

    await casesServices.addCasesS(ctx.request.body as ICasesInfo)
    ctx.body = {
      msg: '新增成功'
    }
  }

  // 编辑
  async editCasesC(ctx: ParameterizedContext, next: Next) {
    const { id } = ctx.request.body as ICasesInfo
    if (!id) {
      ctx.app.emit('error', ErrorTypes.REQUIRE_HAVA_VALUE, ctx)
      return
    }

    await casesServices.editCasesS(ctx.request.body as ICasesInfo)
    ctx.body = {
      msg: '编辑成功'
    }
  }

  // 删除
  async deleteCasesC(ctx: ParameterizedContext, next: Next) {
    const { id } = ctx.request.body as { id: number }
    if (!id) {
      ctx.app.emit('error', ErrorTypes.REQUIRE_HAVA_VALUE, ctx)
      return
    }

    await casesServices.deleteCasesS(id)
    ctx.body = {
      msg: '删除成功'
    }
  }

  // 分页
  async pageCasesC(ctx: ParameterizedContext, next: Next) {
    const data = ctx.request.body as Page

    const res = await casesServices.pageCasesS(data)
    const data1 = (res?.data as Record<string, any>[]).map((item) => {
      return {
        ...item,
        oldPersonName: nameAsterisk(item.oldPersonName)
      }
    })
    ctx.body = {
      msg: '查询成功',
      data: data1,
      total: res?.total
    }
  }
}

export default new CasesController()
