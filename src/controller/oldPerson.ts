import { oldPersonServices } from '../services'

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
}


export default new OldPersonController()