import { oldPersonServices } from '../services'
import ErrorTypes from '../global/constants/error_types'

import type { Next, ParameterizedContext } from 'koa'
import type { IOldPersonInfo } from '../global/types'

class OldPersonController {
  // 人员新增
  async addOldPersonC(ctx: ParameterizedContext, next: Next) {
    const {
      oldPersonName,
      gender,
      age,
      phone,
      address,
      relation,
      familyMember,
      familyMemberPhone,
      familyMemberJob
    } = ctx.request.body as IOldPersonInfo

    const createTime = Date.now()
    await oldPersonServices.addOldPersonS({
      oldPersonName,
      gender,
      age,
      phone,
      address,
      relation,
      familyMember,
      familyMemberPhone,
      familyMemberJob,
      createTime: String(createTime)
    })

    ctx.body = {
      msg: '新增成功'
    }
  }

  // 人员编辑
  async updateOldPersonC(ctx: ParameterizedContext, next: Next) {
    const oldPersonInfo = ctx.request.body as IOldPersonInfo
    if (!oldPersonInfo.id) {
      ctx.app.emit('error', ErrorTypes.REQUIRE_HAVA_VALUE, ctx)
      return
    }

    const updateTime = Date.now()
    await oldPersonServices.updateOldPersonS({
      ...oldPersonInfo,
      updateTime: String(updateTime)
    })
    ctx.body = {
      msg: '编辑成功'
    }
  }
}


export default new OldPersonController()