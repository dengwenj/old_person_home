/**
 * @date 2023/2/3 PM 22:37
 * @description 路由只负责注册接口
 */
import userRouter from "./user"
import oldPersonRouter from "./oldPerson"
import healthyRouter from "./healthy"
import casesRouter from './cases'
import workRestRouter from "./workRest"
import goOutRouter from "./goOut"
import lifeRouter from './life'

export {
  userRouter,
  oldPersonRouter,
  healthyRouter,
  casesRouter,
  workRestRouter,
  goOutRouter,
  lifeRouter
}
