import jwt from 'jsonwebtoken'

import { publicContent } from '../config/keysContent'
import ErrorTypes from '../global/constants/error_types'

import type { Next, ParameterizedContext } from "koa"

export default async function verifyAuth(ctx: ParameterizedContext, next: Next) {
  const { authorization } = ctx.headers
  // authorization 当前端发送请求的时候 请求头里面没有 authorization
  if (!authorization) {
    ctx.app.emit('error', ErrorTypes.UNAUTHORIZATION, ctx)
    return
  }
  
  // 拿到 token
  const token = authorization?.split('Bearer ')[1] || ''
  try {
    const res = jwt.verify(token, publicContent, {
      algorithms: ['RS256']
    })
    ctx.userInfo = res
    await next()
  } catch (error) {
    ctx.app.emit('error', ErrorTypes.UNAUTHORIZATION, ctx)
  }
}
