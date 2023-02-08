/**
 * 人员接口(老人)
 */
import KoaRouter from 'koa-router'

import { oldPersonController } from '../controller'
import { oldPersonMiddleware } from '../middleware'
import verifyAuth from '../middleware/verifyAuth'

const oldPersonRouter = new KoaRouter({ prefix: '/oldperson' })
const { addOldPersonC } = oldPersonController
const { addOldPersonM } = oldPersonMiddleware

// 新增
oldPersonRouter.post('/add', verifyAuth, addOldPersonM, addOldPersonC)

export default oldPersonRouter

