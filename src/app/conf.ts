import dotenv from 'dotenv'

dotenv.config()

type Env = {
  APP_PORT?: any
  MYSQL_HOST?: any
  MYSQL_PORT?: any
  MYSQL_DATABASE?: any
  MYSQL_USER?: any
  MYSQL_PASSWORD?: any
}  & NodeJS.ProcessEnv

const env: Env = process.env

export default env
