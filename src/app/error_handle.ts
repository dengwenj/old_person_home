import type { ParameterizedContext } from "koa"

type MapType = Record<string, { msg: string, status: number }>

export default function errorHandle(error: number, ctx: ParameterizedContext) {
  const map: MapType = {
    0: {
      msg: '用户名或密码不能为空',
      status: 400
    },
    1: {
      msg: '用户名已存在',
      status: 409
    },
    2: {
      msg: '用户名不存在',
      status: 400
    },
    3: {
      msg: '密码错误',
      status: 400
    },
    4: {
      msg: '未授权，token 已过期',
      status: 401
    }
  }

  if (map[error]) {
    ctx.body = {
      msg: map[error].msg
    }
    ctx.status = map[error].status
    return
  }
  ctx.body = 'NOT FOUND'
  ctx.status = 404
}
