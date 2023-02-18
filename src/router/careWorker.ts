/**
 * 护工管理
 */
import KoaRouter from 'koa-router'

import { careWorkerController } from '../controller'
import verifyAuth from '../middleware/verifyAuth'

const careWorkerRouter = new KoaRouter({ prefix: '/careworker' })
const { 
  addCareWorkerC, 
  editCareWorkerC, 
  deleteCareWorkerC, 
  pageCareWorkerC,
} = careWorkerController

// 新增
careWorkerRouter.post('/add', verifyAuth, addCareWorkerC)
// 编辑
careWorkerRouter.post('/edit', verifyAuth, editCareWorkerC)
// 删除
careWorkerRouter.post('/delete', verifyAuth, deleteCareWorkerC)
// 分页
careWorkerRouter.post('/page', verifyAuth, pageCareWorkerC)

export default careWorkerRouter
