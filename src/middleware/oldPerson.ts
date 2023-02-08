import ErrorTypes from '../global/constants/error_types'

import type { ParameterizedContext, Next } from 'koa'
import type { IOldPersonInfo } from '../global/types'

class OldPersonMiddleware {
  async addOldPersonM(ctx: ParameterizedContext, next: Next) {
    const {
      oldPersonName,
      gender,
      age,
      phone,
      address,
      relation,
      familyMember,
      familyMemberPhone,
    } = ctx.request.body as IOldPersonInfo
    // 必须有值
    const fieldsArr = [oldPersonName, gender, age, phone, address, relation, familyMember, familyMemberPhone]
    for (const field of fieldsArr) {
      if (field === '' || field === undefined || field === null) {
        ctx.app.emit('error', ErrorTypes.REQUIRE_HAVA_VALUE, ctx)
        return
      }
    }

    await next()
  }
}

export default new OldPersonMiddleware()
