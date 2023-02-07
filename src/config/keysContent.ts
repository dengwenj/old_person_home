import fs from 'fs'
import path from 'path'

const privatePathname = path.resolve(__dirname, '../../keys/private.key')
const publicPathname = path.resolve(__dirname, '../../keys/public.key')
const privateContent = fs.readFileSync(privatePathname)
const publicContent = fs.readFileSync(publicPathname)

export {
  privateContent,
  publicContent
}
