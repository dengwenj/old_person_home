/**
 * 作息管理
 */
import KoaRouter from 'koa-router'

import { workRestController } from '../controller'

const workRestRouter = new KoaRouter({ prefix: '/workrest' })
const { 
  addWorkRestC, 
  editWorkRestC, 
  deleteWorkRestC, 
  pageWorkRestC 
} = workRestController

// 新增
workRestRouter.post('/add', addWorkRestC)
// 编辑
workRestRouter.post('/edit', editWorkRestC)
// 删除
workRestRouter.post('/delete', deleteWorkRestC)
// 分页
workRestRouter.post('/page', pageWorkRestC)

export default workRestRouter
