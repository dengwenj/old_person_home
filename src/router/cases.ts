/**
 * 病例管理
 */
import KoaRouter from 'koa-router'

import { casesController } from '../controller'
import verifyAuth from '../middleware/verifyAuth'

const casesRouter = new KoaRouter({ prefix: '/cases' })
const { addCasesC, editCasesC, deleteCasesC, pageCasesC } = casesController

// 新增
casesRouter.post('/add', verifyAuth, addCasesC)
// 编辑
casesRouter.post('/edit', verifyAuth, editCasesC)
// 删除
casesRouter.post('/delete', verifyAuth, deleteCasesC)
// 分页
casesRouter.post('/page', verifyAuth, pageCasesC)

export default casesRouter
