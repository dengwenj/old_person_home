/**
 * 寝室管理
 */
import KoaRouter from 'koa-router'

import { bedroomController } from '../controller'

const bedroomRouter = new KoaRouter({ prefix: '/bedroom' })
const { 
  addBedroomC, 
  editBedroomC, 
  deleteBedroomC, 
  pageBedroomC,
  bedroomByNumBedroomC
} = bedroomController

// 新增
bedroomRouter.post('/add', addBedroomC)
// 编辑
bedroomRouter.post('/edit', editBedroomC)
// 删除
bedroomRouter.post('/delete', deleteBedroomC)
// 分页
bedroomRouter.post('/page', pageBedroomC)
// 通过寝室号查找寝室（模糊查询）
bedroomRouter.post('/getBedroomByNum', bedroomByNumBedroomC)

export default bedroomRouter
