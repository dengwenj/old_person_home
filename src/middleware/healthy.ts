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

  (ctx.request.body as IHealthyInfo).healthyDes = des
  await next()
}

const healthyM = {
  addHealthyM
}
export default healthyM
