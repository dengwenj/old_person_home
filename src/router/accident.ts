/**
 * 事故管理
 */
import KoaRouter from 'koa-router'

import { accidentController } from '../controller'
import verifyAuth from '../middleware/verifyAuth'

const accidentRouter = new KoaRouter({ prefix: '/accident' })
const { addAccidentC, editAccidentC, deleteAccidentC, pagAccidentC } = accidentController

// 新增
accidentRouter.post('/add', verifyAuth, addAccidentC)
// 编辑
accidentRouter.post('/edit', verifyAuth, editAccidentC)
// 删除
accidentRouter.post('/delete', verifyAuth, deleteAccidentC)
// 分页
accidentRouter.post('/page', verifyAuth, pagAccidentC)

export default accidentRouter
