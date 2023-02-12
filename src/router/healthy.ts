/**
 * 健康接口
 */
import KoaRouter from 'koa-router'

import { healthyController } from '../controller'

const healthyRouter = new KoaRouter({ prefix: '/healthy' })
const { addHealthyC } = healthyController

// 新增
healthyRouter.post('/add', addHealthyC)
// 编辑
healthyRouter.post('/update')
// 删除
healthyRouter.post('/delete')
// 分页
healthyRouter.post('/page')

export default healthyRouter
