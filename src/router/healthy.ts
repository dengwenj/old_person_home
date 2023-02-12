/**
 * 健康接口
 */
import KoaRouter from 'koa-router'

import { healthyM } from '../middleware'
import { healthyController } from '../controller'
import verifyAuth from '../middleware/verifyAuth'

const healthyRouter = new KoaRouter({ prefix: '/healthy' })
const { addHealthyC, updateHealthyC, deleteHealthyC, pageHealthyC } = healthyController
const { addHealthyM } = healthyM

// 新增
healthyRouter.post('/add', verifyAuth, addHealthyM, addHealthyC)
// 编辑
healthyRouter.post('/update', verifyAuth, updateHealthyC)
// 删除
healthyRouter.post('/delete', verifyAuth, deleteHealthyC)
// 分页
healthyRouter.post('/page', verifyAuth, pageHealthyC)

export default healthyRouter
