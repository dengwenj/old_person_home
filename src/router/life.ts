/**
 * 入住管理
 */
import KoaRouter from 'koa-router'

import { lifeController } from '../controller'

const lifeRouter = new KoaRouter({ prefix: '/life' })
const { addLifeC, editLifeC, deleteLifeC, pageLifeC } = lifeController

// 新增
lifeRouter.post('/add', addLifeC)
// 编辑
lifeRouter.post('/edit', editLifeC)
// 删除
lifeRouter.post('/delete', deleteLifeC)
// 分页
lifeRouter.post('/page', pageLifeC)

export default lifeRouter
