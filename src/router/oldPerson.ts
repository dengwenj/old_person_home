/**
 * 人员接口(老人)
 */
import KoaRouter from 'koa-router'

import { oldPersonController } from '../controller'
import { oldPersonMiddleware } from '../middleware'
import verifyAuth from '../middleware/verifyAuth'

const oldPersonRouter = new KoaRouter({ prefix: '/oldperson' })
const { 
  addOldPersonC,
  updateOldPersonC, 
  deleteOldPersonC,
  pageOldPersonC
} = oldPersonController
const { addOldPersonM } = oldPersonMiddleware

// 新增
oldPersonRouter.post('/add', verifyAuth, addOldPersonM, addOldPersonC)
// 编辑
oldPersonRouter.post('/update', verifyAuth, updateOldPersonC)
// 删除
oldPersonRouter.post('/delete', verifyAuth, deleteOldPersonC)
// 分页
oldPersonRouter.post('/page', verifyAuth, pageOldPersonC)

export default oldPersonRouter
