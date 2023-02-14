/**
 * 外出报备
 */

import KoaRouter from 'koa-router'

import { goOutController } from '../controller'
 
const goOutRouter = new KoaRouter({ prefix: '/goout' })
const { addGoOutC, editGoOutC, deleteGoOutC, pageGoOutC } = goOutController

// 新增
goOutRouter.post('/add', addGoOutC)
// 编辑
goOutRouter.post('/edit', editGoOutC)
// 删除
goOutRouter.post('/delete', deleteGoOutC)
// 分页
goOutRouter.post('/page', pageGoOutC)

export default goOutRouter
