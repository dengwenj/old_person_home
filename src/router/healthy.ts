/**
 * 健康接口
 */
import KoaRouter from 'koa-router'

import { healthyM } from '../middleware'
import { healthyController } from '../controller'

const healthyRouter = new KoaRouter({ prefix: '/healthy' })
const { addHealthyC } = healthyController
const { addHealthyM } = healthyM

// 新增
healthyRouter.post('/add', addHealthyM, addHealthyC)
// 编辑
healthyRouter.post('/update')
// 删除
healthyRouter.post('/delete')
// 分页
healthyRouter.post('/page')

export default healthyRouter
