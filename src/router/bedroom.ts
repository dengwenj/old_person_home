/**
 * 寝室管理
 */
import KoaRouter from 'koa-router'

import { bedroomController } from '../controller'
import verifyAuth from '../middleware/verifyAuth'

const bedroomRouter = new KoaRouter({ prefix: '/bedroom' })
const { 
  addBedroomC, 
  editBedroomC, 
  deleteBedroomC, 
  pageBedroomC,
  bedroomByNumBedroomC
} = bedroomController

// 新增
bedroomRouter.post('/add', verifyAuth, addBedroomC)
// 编辑
bedroomRouter.post('/edit', verifyAuth, editBedroomC)
// 删除
bedroomRouter.post('/delete', verifyAuth, deleteBedroomC)
// 分页
bedroomRouter.post('/page', verifyAuth, pageBedroomC)
// 通过寝室号查找寝室（模糊查询）
bedroomRouter.post('/getBedroomByNum', verifyAuth, bedroomByNumBedroomC)

export default bedroomRouter
