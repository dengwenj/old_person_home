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
        data: res,
        code: 1
      }
      return
    }

    // 该人员加入这寝室，寝室人数就 + 1, 满了不允许加入
    // 先看该寝室人满了么
    const res1: any = await mysql.actionQuery('bedroom', `id = ${bedroomId}`)
    // isFull 0 未满 1 已满
    if (res1[0].isFull === 1) {
      ctx.body = {
        msg: '该寝室人数已满',
        code: 1
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
    const { id, bedroomId, checkInTime } = ctx.request.body as ILifeInfo
    if (!id) {
      ctx.app.emit('error', ErrorTypes.REQUIRE_HAVA_VALUE, ctx)
      return
    }

    // 判断换入的这个寝室人满没
    const res: any = await mysql.actionQuery('bedroom', `id = ${bedroomId}`)
    if (res[0].isFull === 1) {
      ctx.body = {
        msg: '该寝室人数已满',
        data: res,
        code: 1
      }
      return
    }

    // 当前的寝室人数 -1 和 isFull 变为 0，换入的这寝室人数 + 1
    // 拿到之前的寝室先拿到寝室 id
    const res1: any = await mysql.actionQuery('life', `id = ${id}`)
    // 拿到之前的寝室
    const res2: any = await mysql.actionQuery('bedroom', `id = ${res1[0].bedroomId}`)
    await mysql.actionUpdate(
      'bedroom',
      {
        lived: res2[0].lived - 1,
        isFull: 0
      },
      ['id', res2[0].id]
    )
    // 换入的这寝室人数 + 1
    await mysql.actionUpdate(
      'bedroom',
      {
        lived: res[0].lived + 1
      },
      ['id', bedroomId!]
    )
    // 再看已住人数和分配人数是否一样，isFull 是否改变
    const res3: any = await mysql.actionQuery('bedroom', `id = ${bedroomId!}`)
    if (res3[0].disPersonNum === res3[0].lived) {
      // 把 isFull 变为 1，为已满
      await mysql.actionUpdate(
        'bedroom', 
        {
          isFull: 1
        },
        ['id', bedroomId!]
      )
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

    // 该人员住的寝室人数也要减少
    const res: any = await mysql.actionQuery('life', `id = ${id}`)
    // 拿到该寝室
    const res1: any = await mysql.actionQuery('bedroom', `id = ${res[0].bedroomId}`)
    // 把该寝室人数 -1
    await mysql.actionUpdate(
      'bedroom',
      {
        lived: res1[0].lived - 1,
        isFull: 0
      },
      ['id', res1[0].id]
    )

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

  // 获取全部人员
  async getAllC(ctx: ParameterizedContext, next: Next) {
    const res = await lifeServices.getAllS() as Record<string, any>[];
    const res1 = res.map((item) => {
      return {
        ...item,
        month: item.checkInTime.split('-')[1]
      }
    })
    // 弄成 12 月
    const month = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
    const monthAndPeopleNum = []
    for (const item of month) {
      let peopleNum = 0
      res1.forEach((itex) => {
        // 月份相等就+1
        if (itex.month === item) {
          peopleNum++
        }
      })
      monthAndPeopleNum.push({
        month: `${item[0] === '0' ? item[1] : item}月`,
        peopleNum
      })
    }

    ctx.body = {
      data: monthAndPeopleNum
    }
  }
}

export default new LifeController()
