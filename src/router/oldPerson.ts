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
  pageOldPersonC,
  getOldpersonByNameC,
  getPeopleByAgeC
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
// 通过查询姓名拿到人员
oldPersonRouter.post('/getOldpersonByName', verifyAuth, getOldpersonByNameC)
// 通过年龄段获取人数
oldPersonRouter.post('/getPeopleByAge', verifyAuth, getPeopleByAgeC)

export default oldPersonRouter

