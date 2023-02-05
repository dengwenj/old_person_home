export interface IUserInfo {
  id?: number
  username?: string
  password?: string
  role?: number
}

export type Page = {
  current?: number
  pageSize?: number
} & Record<string, any>
