/**
 * 病例管理
 */
import { casesServices } from '../services'
import ErrorTypes from '../global/constants/error_types'

import type { ParameterizedContext, Next } from 'koa'
import type { ICasesInfo } from '../global/types'

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
    console.log(ctx.request.body);
    

    await casesServices.addCasesS(ctx.request.body as ICasesInfo)
    ctx.body = {
      msg: '新增成功'
    }
  }

  // 编辑
  editCasesC(ctx: ParameterizedContext, next: Next) {

  }

  // 删除
  deleteCasesC(ctx: ParameterizedContext, next: Next) {

  }

  // 分页
  pageCasesC(ctx: ParameterizedContext, next: Next) {

  }
}

export default new CasesController()
