/**
 * 健康接口
 */
import KoaRouter from 'koa-router'

const healthyRouter = new KoaRouter({ prefix: '/healthy' })

// 新增
healthyRouter.post('/add')
// 编辑
healthyRouter.post('/update')
// 删除
healthyRouter.post('/delete')
// 分页
healthyRouter.post('/page')

export default healthyRouter
