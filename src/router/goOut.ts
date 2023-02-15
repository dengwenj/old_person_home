/**
 * 外出报备
 */

import KoaRouter from 'koa-router'

import { goOutController } from '../controller'
import verifyAuth from '../middleware/verifyAuth'
 
const goOutRouter = new KoaRouter({ prefix: '/goout' })
const { addGoOutC, editGoOutC, deleteGoOutC, pageGoOutC } = goOutController

// 新增
goOutRouter.post('/add', verifyAuth, addGoOutC)
// 编辑
goOutRouter.post('/edit', verifyAuth, editGoOutC)
// 删除
goOutRouter.post('/delete', verifyAuth, deleteGoOutC)
// 分页
goOutRouter.post('/page', verifyAuth, pageGoOutC)

export default goOutRouter
