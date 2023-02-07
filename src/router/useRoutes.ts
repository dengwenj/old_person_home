import { readdirSync } from "fs"

import type Application from "koa"
import type Router from "koa-router"

export default async function useRoutes(this: Application) {
  const fileArr = readdirSync(__dirname)

  for (const item of fileArr) {
    if (item === 'index.ts' || item === 'index.js') {
      const res = await import(`./${item}`)
      // 每一个对象 key
      Object.keys(res).forEach((itex) => {
        // (res[itex] as Router) 拿到值
        this.use((res[itex] as Router).routes())
        this.use((res[itex] as Router).allowedMethods())
      })
    }
  }
}
