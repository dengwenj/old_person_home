/**
 * 访客管理
 */
import KoaRouter from 'koa-router'

import { visitorsController } from '../controller'
import verifyAuth from '../middleware/verifyAuth'

const visitorsRouter = new KoaRouter({ prefix: '/visitors' })
const { addVisitorsC, editVisitorsC, deleteVisitorsC, pageVisitorsC } = visitorsController

// 新增
visitorsRouter.post('/add', verifyAuth, addVisitorsC)
// 编辑
visitorsRouter.post('/edit', verifyAuth, editVisitorsC)
// 删除
visitorsRouter.post('/delete', verifyAuth, deleteVisitorsC)
// 分页查询
visitorsRouter.post('/page', verifyAuth, pageVisitorsC)

export default visitorsRouter
