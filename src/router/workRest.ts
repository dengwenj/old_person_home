/**
 * 作息管理
 */
import KoaRouter from 'koa-router'

import { workRestController } from '../controller'
import verifyAuth from '../middleware/verifyAuth'

const workRestRouter = new KoaRouter({ prefix: '/workrest' })
const { 
  addWorkRestC, 
  editWorkRestC, 
  deleteWorkRestC, 
  pageWorkRestC 
} = workRestController

// 新增
workRestRouter.post('/add', verifyAuth, addWorkRestC)
// 编辑
workRestRouter.post('/edit', verifyAuth, editWorkRestC)
// 删除
workRestRouter.post('/delete', verifyAuth, deleteWorkRestC)
// 分页
workRestRouter.post('/page', verifyAuth, pageWorkRestC)

export default workRestRouter
