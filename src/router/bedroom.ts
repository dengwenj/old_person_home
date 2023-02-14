/**
 * 寝室管理
 */
import KoaRouter from 'koa-router'

import { bedroomController } from '../controller'

const bedroomRouter = new KoaRouter({ prefix: '/bedroom' })
const { addBedroomC, editBedroomC, deleteBedroomC, pageBedroomC } = bedroomController

// 新增
bedroomRouter.post('/add', addBedroomC)
// 编辑
bedroomRouter.post('/edit', editBedroomC)
// 删除
bedroomRouter.post('/delete', deleteBedroomC)
// 分页
bedroomRouter.post('/page', pageBedroomC)

export default bedroomRouter
