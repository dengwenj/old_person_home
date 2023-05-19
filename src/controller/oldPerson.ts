import { oldPersonServices } from '../services'
import ErrorTypes from '../global/constants/error_types'
import { nameAsterisk, phoneAsterisk } from '../utils/tool'

import type { Next, ParameterizedContext } from 'koa'
import type { IOldPersonInfo, Page } from '../global/types'

class OldPersonController {
  // 人员新增
  async addOldPersonC(ctx: ParameterizedContext, next: Next) {
    const {
      oldPersonName,
      gender,
      birthDate,
      phone,
      address,
      relation,
      isSpouse,
      familyMember,
      familyMemberPhone,
      familyMemberJob,
      familyMemberAddress
    } = ctx.request.body as IOldPersonInfo

    const createTime = Date.now()
    const date = new Date(createTime)
    // 当前年
    const year = date.getFullYear()
    const bYear = Number(birthDate!.split('-')[0])
    // 获取年龄
    const age = year - bYear
    await oldPersonServices.addOldPersonS({
      oldPersonName,
      gender,
      age,
      birthDate,
      phone,
      address,
      relation,
      isSpouse,
      familyMember,
      familyMemberPhone,
      familyMemberJob,
      familyMemberAddress,
      createTime: String(createTime)
    })

    ctx.body = {
      msg: '新增成功'
    }
  }

  // 人员编辑
  async updateOldPersonC(ctx: ParameterizedContext, next: Next) {
    const oldPersonInfo = ctx.request.body as IOldPersonInfo
    if (!oldPersonInfo.id) {
      ctx.app.emit('error', ErrorTypes.REQUIRE_HAVA_VALUE, ctx)
      return
    }

    const updateTime = Date.now()
    const date = new Date(updateTime)
    // 当前年
    const year = date.getFullYear()
    const bYear = Number(oldPersonInfo.birthDate!.split('-')[0])
    // 获取年龄
    const age = year - bYear
    await oldPersonServices.updateOldPersonS({
      ...oldPersonInfo,
      age,
      updateTime: String(updateTime)
    })
    ctx.body = {
      msg: '编辑成功'
    }
  }

  // 人员删除
  async deleteOldPersonC(ctx: ParameterizedContext, next: Next) {
    const { id } = ctx.request.body as { id: number }
    if (!id) {
      ctx.app.emit('error', ErrorTypes.REQUIRE_HAVA_VALUE, ctx)
      return
    }

    await oldPersonServices.deleteOldPersonS(id)
    ctx.body = {
      msg: '删除成功'
    }
  }

  // 分页
  async pageOldPersonC(ctx: ParameterizedContext, next: Next) {
    const data = ctx.request.body as Page
    const res = await oldPersonServices.pageOldPersonS(data)
    
    const data1 = (res?.data as Record<string, any>[]).map((item) => {
      const name = item.oldPersonName;
      const phone = item.phone;
      const phone1 = item.familyMemberPhone;
      const name1 = item.familyMember;
      
      return {
        ...item,
        oldPersonName: nameAsterisk(name),
        phone: phoneAsterisk(phone),
        familyMemberPhone: phoneAsterisk(phone1),
        familyMember: nameAsterisk(name1)
      }
    })
    
    ctx.body = {
      msg: '查询成功',
      data: data1,
      total: res?.total
    }
  }

  // 通过人员姓名拿到人员 模糊查询
  async getOldpersonByNameC(ctx: ParameterizedContext, next: Next) {
    const { oldPersonName } = ctx.request.body as { oldPersonName: string }
    if (!oldPersonName) {
      ctx.app.emit('error', ErrorTypes.REQUIRE_HAVA_VALUE, ctx)
      return
    }

    // 说明有值
    const data = await oldPersonServices.getOldpersonByNameS(oldPersonName)
    ctx.body = {
      msg: '查询成功',
      data
    }
  }

  // 通过年龄段获取人数
  async getPeopleByAgeC(ctx: ParameterizedContext, next: Next) {
    const res = await oldPersonServices.getPeopleByAgeS() as Record<string, any>[]
    const birthYearList = res.map((item) => {
      return item.birthDate.split('-')[0]
    })
    const time = Date.now()
    const date = new Date(time)
    // 当前年
    const year = date.getFullYear()

    // 当前年减去生的年份就是多少岁
    const ageList = []
    for (const item of birthYearList) {
      const age = year - item
      ageList.push(age)
    }
    
    const objList = [
      {
        allPeople: 0,
        type: '60-65岁'
      },
      {
        allPeople: 0,
        type: '66-70岁'
      },
      {
        allPeople: 0,
        type: '71-75岁'
      },
      {
        allPeople: 0,
        type: '76-80岁'
      },
      {
        allPeople: 0,
        type: '81-85岁'
      },
      {
        allPeople: 0,
        type: '其他岁数'
      },
    ]
    const map = {
      sixtySixtyFive: [60, 61, 62, 63, 64, 65],
      sixtySixSeventy: [66, 67, 68, 69, 70],
      seventyOneSeventyFive: [71, 72, 73, 74, 75],
      seventySixEighty: [76, 77, 78, 79, 80],
      eightyOneEightyFive: [81, 82, 83, 84, 85]
    }
    for (const item of ageList) {
      if (map.sixtySixtyFive.includes(item)) {
        objList[0].allPeople += 1
      } else if (map.sixtySixSeventy.includes(item)) {
        objList[1].allPeople += 1
      } else if (map.seventyOneSeventyFive.includes(item)) {
        objList[2].allPeople += 1
      } else if (map.seventySixEighty.includes(item)) {
        objList[3].allPeople += 1
      } else if (map.eightyOneEightyFive.includes(item)) {
        objList[4].allPeople += 1
      } else {
        objList[5].allPeople += 1
      }
    }

    ctx.body = {
      data: objList
    }
  }
}


export default new OldPersonController()
