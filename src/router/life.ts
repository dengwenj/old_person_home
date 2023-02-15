/**
 * 入住管理
 */
import KoaRouter from 'koa-router'

import { lifeController } from '../controller'
import verifyAuth from '../middleware/verifyAuth'

const lifeRouter = new KoaRouter({ prefix: '/life' })
const { addLifeC, editLifeC, deleteLifeC, pageLifeC } = lifeController

// 新增
lifeRouter.post('/add', verifyAuth, addLifeC)
// 编辑
lifeRouter.post('/edit', verifyAuth, editLifeC)
// 删除
lifeRouter.post('/delete', verifyAuth, deleteLifeC)
// 分页
lifeRouter.post('/page', verifyAuth, pageLifeC)

export default lifeRouter
