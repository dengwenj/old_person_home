import type { ParameterizedContext } from "koa"

type MapType = Record<string, { message: string, status: number }>

export default function errorHandle(error: number, ctx: ParameterizedContext) {
  const map: MapType = {
    0: {
      message: '用户名或密码不能为空',
      status: 400
    },
  }

  if (map[error]) {
    ctx.body = {
      msg: map[error].message
    }
    ctx.status = map[error].status
    return
  }
  ctx.body = 'NOT FOUND'
  ctx.status = 404
}
