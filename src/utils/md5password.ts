import crypto from 'crypto' // node 里面自带的

const md5password = (password: string) => {
  // crypto 加密的意思
  const md5 = crypto.createHash('md5') // 'md5' 要以 md5 的方式加密
  const finallyPassword = md5.update(password).digest('hex') // 'hex' 以16进制。 转成 字符串
  return finallyPassword
}

export default md5password
