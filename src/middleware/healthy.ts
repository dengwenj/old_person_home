import mysql from "../utils/mysql"
import ErrorTypes from "../global/constants/error_types"

import type { Next, ParameterizedContext } from "koa"
import type { IHealthyInfo } from '../global/types'

// 新增健康必传
async function addHealthyM(ctx: ParameterizedContext, next: Next) {
  // 拿到人员 id
  const {
    oldPersonId,
    PETime,
    height,
    weight,
    bloodOxygen,
    heartRate,
    bloodPressure,
    bloodType,
    isAllergy, 
    isSmoke
  } = ctx.request.body as IHealthyInfo
  // 必须有值
  const fieldsArr = [
    oldPersonId,
    PETime,
    height,
    weight,
    bloodOxygen,
    heartRate,
    bloodPressure,
    bloodType,
    isAllergy, 
    isSmoke
  ]
  for (const field of fieldsArr) {
    if (field === '' || field === undefined || field === null) {
      ctx.app.emit('error', ErrorTypes.REQUIRE_HAVA_VALUE, ctx)
      return
    }
  }

  // // 通过 oldPersonId 拿到该人员
  // const res = await mysql.actionQuery('old_person', `id = ${oldPersonId}`)
  await next()
}

const healthyM = {
  addHealthyM
}
export default healthyM
