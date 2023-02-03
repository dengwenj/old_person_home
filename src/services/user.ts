import connection from '../dataBase'

interface IUser {
  username: string
  password: number
}

class UserServices {
  async create(user: IUser) {
    const { username, password } = user

    const statement = 'INSERT INTO USER (username, password) VALUES (?, ?)'
    const res = await connection.execute(statement, [username, password])
    return res
  }
}

export default new UserServices
