import { healthyServices } from '../services'

import type { Next, ParameterizedContext } from "koa"
import type { IHealthyInfo } from "../global/types"

class HealthyController {
  async addHealthyC(ctx: ParameterizedContext, next: Next) {
    const res = await healthyServices.addHealthyS(ctx.request.body as IHealthyInfo)
    ctx.body = {
      msg: '新增成功'
    }
  }
}

export default new HealthyController()
