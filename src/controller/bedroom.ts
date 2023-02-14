/**
 * 寝室管理
 */
import { bedroomServices } from '../services'
import ErrorTypes from '../global/constants/error_types'

import type { ParameterizedContext, Next } from 'koa'
import type { IBedroomInfo, Page } from '../global/types'

class BedroomController {
  // 新增
  async addBedroomC(ctx: ParameterizedContext, next: Next) {
    const {
      bedroomNum,
      disPersonNum
    } = ctx.request.body as IBedroomInfo
    // 新增时为未满，当人数达到 disPersonNum 人数是为已满
    (ctx.request.body as IBedroomInfo).isFull = 0

    // 必须有值
    const fieldsArr = [bedroomNum, disPersonNum]
    for (const field of fieldsArr) {
      if (field === '' || field === undefined || field === null) {
        ctx.app.emit('error', ErrorTypes.REQUIRE_HAVA_VALUE, ctx)
        return
      }
    }

    await bedroomServices.addBedroomS(ctx.request.body as IBedroomInfo)
    ctx.body = {
      msg: '新增成功'
    }
  }

  // 编辑
  async editBedroomC(ctx: ParameterizedContext, next: Next) {
    const { id } = ctx.request.body as IBedroomInfo
    if (!id) {
      ctx.app.emit('error', ErrorTypes.REQUIRE_HAVA_VALUE, ctx)
      return
    }

    await bedroomServices.editBedroomS(ctx.request.body as IBedroomInfo)
    ctx.body = {
      msg: '编辑成功'
    }
  }

  // 删除
  async deleteBedroomC(ctx: ParameterizedContext, next: Next) {
    const { id } = ctx.request.body as { id: number }
    if (!id) {
      ctx.app.emit('error', ErrorTypes.REQUIRE_HAVA_VALUE, ctx)
      return
    }

    await bedroomServices.deleteBedroomS(id)
    ctx.body = {
      msg: '删除成功'
    }
  }

  // 分页
  async pageBedroomC(ctx: ParameterizedContext, next: Next) {
    const data = ctx.request.body as Page

    const res = await bedroomServices.pageBedroomS(data)
    ctx.body = {
      msg: '查询成功',
      data: res?.data,
      total: res?.total
    }
  }
}

export default new BedroomController()
