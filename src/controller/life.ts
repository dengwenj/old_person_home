/**
 * 入住管理
 */
import { lifeServices } from '../services'
import ErrorTypes from '../global/constants/error_types'
import mysql from '../utils/mysql'

import type { ParameterizedContext, Next } from 'koa'
import type { ILifeInfo, Page } from '../global/types'

class LifeController {
  // 新增
  async addLifeC(ctx: ParameterizedContext, next: Next) {
    const {
      oldPersonId,
      checkInTime,
      bedroomId,
    } = ctx.request.body as ILifeInfo
    // 必须有值
    const fieldsArr = [oldPersonId, checkInTime, bedroomId]
    for (const field of fieldsArr) {
      if (field === '' || field === undefined || field === null) {
        ctx.app.emit('error', ErrorTypes.REQUIRE_HAVA_VALUE, ctx)
        return
      }
    }

    // 新增过的人不能再新增,消除了才能新增
    const res: any = await mysql.actionQuery('life', `oldPersonId = '${oldPersonId}'`)
    if (res.length) {
      ctx.body = {
        msg: '该老人已有房间',
        data: res
      }
      return
    }

    // 该人员加入这寝室，寝室人数就 + 1, 满了不允许加入
    // 先看该寝室人满了么
    const res1: any = await mysql.actionQuery('bedroom', `id = ${bedroomId}`)
    // isFull 0 未满 1 已满
    if (res1[0].isFull === 1) {
      ctx.body = {
        msg: '该寝室人数已满'
      }
      return
    }
    // 走这里来说明该寝室人数未满
    // 更新寝室表
    await mysql.actionUpdate(
      'bedroom', 
      {
        // 加一
        lived: res1[0].lived + 1
      }, 
      ['id', bedroomId!]
    )
    // 寝室人数加了过后再看,已住人数是否等于分配人数
    const res2: any = await mysql.actionQuery('bedroom', `id = ${bedroomId}`)
    if (res2[0].disPersonNum === res2[0].lived) {
      // 把 isFull 变为 1，为已满
      await mysql.actionUpdate(
        'bedroom', 
        {
          isFull: 1
        },
        ['id', bedroomId!]
      )
    }

    // 新增人数
    await lifeServices.addLifeS(ctx.request.body as ILifeInfo)

    ctx.body = {
      msg: '新增成功'
    }
  }

  // 编辑
  async editLifeC(ctx: ParameterizedContext, next: Next) {
    const { id } = ctx.request.body as ILifeInfo
    if (!id) {
      ctx.app.emit('error', ErrorTypes.REQUIRE_HAVA_VALUE, ctx)
      return
    }

    await lifeServices.editLifeS(ctx.request.body as ILifeInfo)
    ctx.body = {
      msg: '编辑成功'
    }
  }

  // 删除
  async deleteLifeC(ctx: ParameterizedContext, next: Next) {
    const { id } = ctx.request.body as { id: number }
    if (!id) {
      ctx.app.emit('error', ErrorTypes.REQUIRE_HAVA_VALUE, ctx)
      return
    }

    await lifeServices.deleteLifeS(id)
    ctx.body = {
      msg: '删除成功'
    }
  }

  // 分页
  async pageLifeC(ctx: ParameterizedContext, next: Next) {
    const data = ctx.request.body as Page

    const res = await lifeServices.pageLifeS(data)
    ctx.body = {
      msg: '查询成功',
      data: res?.data,
      total: res?.total
    }
  }
}

export default new LifeController()
