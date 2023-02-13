/**
 * 病例管理
 */
import KoaRouter from 'koa-router'

import { casesController } from '../controller'

const casesRouter = new KoaRouter({ prefix: '/cases' })
const { addCasesC, editCasesC, deleteCasesC, pageCasesC } = casesController

// 新增
casesRouter.post('/add', addCasesC)
// 编辑
casesRouter.post('/edit', editCasesC)
// 删除
casesRouter.post('/delete', deleteCasesC)
// 分页
casesRouter.post('/page', pageCasesC)

export default casesRouter
