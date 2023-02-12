import mysql from "../utils/mysql"

import type { IHealthyInfo } from "../global/types"

class HealthyServices {
  async addHealthyS(healthyInfo: IHealthyInfo) {
    const res = mysql.actionAdd('healthy', healthyInfo)
    return res
  }
}

export default new HealthyServices()