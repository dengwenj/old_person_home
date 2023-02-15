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

// 病例档案
export interface ICasesInfo {
  id?: number
  oldPersonId?: number
  cases?: string
  fallIllTime?: string 
  isTreat?: number
  treatDrug?: string
  drugPrice?: string
  treatHospital?: string
}

// 作息时间
export interface IWorkRest {
  id?: number
  season?: number
  sevenEight?: string
  eightNine?: string
  nineTen?: string
  tenEleven?: string
  elevenTwelve?: string
  twelveFourteen?: string
  fourteenSeventeen?: string
  seventeenNineteen?: string
  nineteenTwentyone?: string
  twentyoneAfter?: string
  slogan?: string
}

// 外出报备
export interface IGoOutInfo {
  id?: number
  oldPersonId?: number
  goOutAddress?: string
  goOutTime?: string
  goOutEvent?: string
}

// 入住管理
export interface ILifeInfo {
  id?: number
  oldPersonId?: number
  checkInTime?: string
  bedroomId?: number
}

// 寝室管理
export interface IBedroomInfo {
  id?: number
  bedroomNum?: string
  disPersonNum?: number
  isFull?: number
  lived?: number
}