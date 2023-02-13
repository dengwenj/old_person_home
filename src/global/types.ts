import type Application from "koa"

export interface IUserInfo {
  id?: number
  username?: string
  password?: string
  role?: number
  createTime?: string
}

export type Page = {
  current?: number
  pageSize?: number
} & Record<string, any>

export interface ILogin {
  username: string
  password: string
}

export interface IApplication extends Application {
  useRoutes?: (app: Application) => void
}

// 人员信息
export interface IOldPersonInfo {
  id?: number,
  oldPersonName?: string
  gender?: number
  age?: number
  birthDate?: string
  phone?: string
  address?: string
  relation?: string
  isSpouse?: number
  familyMember?: string
  familyMemberPhone?: string
  familyMemberJob?: string
  createTime?: string
  updateTime?: string 
  familyMemberAddress?: string
}

// 健康
export interface IHealthyInfo {
  id?: number
  oldPersonId?: number
  PETime?: string
  height?: number
  weight?: number
  bloodType?: string
  heartRate?: string
  bloodOxygen?: string
  bloodPressure?: string
  isAllergy?: number
  isSmoke?: number
  healthyDes?: string
}
