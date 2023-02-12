import { oldPersonServices } from '../services'
import ErrorTypes from '../global/constants/error_types'

import type { Next, ParameterizedContext } from 'koa'
import type { IOldPersonInfo, Page } from '../global/types'

class OldPersonController {
  // 人员新增
  async addOldPersonC(ctx: ParameterizedContext, next: Next) {
    const {
      oldPersonName,
      gender,
      age,
      birthDate,
      phone,
      address,
      relation,
      isSpouse,
      familyMember,
      familyMemberPhone,
      familyMemberJob,
      familyMemberAddress
    } = ctx.request.body as IOldPersonInfo

    const createTime = Date.now()
    await oldPersonServices.addOldPersonS({
      oldPersonName,
      gender,
      age,
      birthDate,
      phone,
      address,
      relation,
      isSpouse,
      familyMember,
      familyMemberPhone,
      familyMemberJob,
      familyMemberAddress,
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

  // 人员删除
  async deleteOldPersonC(ctx: ParameterizedContext, next: Next) {
    const { id } = ctx.request.body as { id: number }
    if (!id) {
      ctx.app.emit('error', ErrorTypes.REQUIRE_HAVA_VALUE, ctx)
      return
    }

    await oldPersonServices.deleteOldPersonS(id)
    ctx.body = {
      msg: '删除成功'
    }
  }

  // 分页
  async pageOldPersonC(ctx: ParameterizedContext, next: Next) {
    const data = ctx.request.body as Page
    const res = await oldPersonServices.pageOldPersonS(data)
    ctx.body = {
      msg: '查询成功',
      data: res?.data,
      total: res?.total
    }
  }
}


export default new OldPersonController()