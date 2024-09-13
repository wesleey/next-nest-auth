import { decode } from 'jsonwebtoken'
import { Role, User } from '@/types/user'
import { parseCredentials } from './cookies'

export function retrieveUser() {
  const { accessToken } = parseCredentials()

  const decoded = decode(accessToken) as {
    sub: string
    name: string
    email: string
    role: Role
  }

  if (!decoded) {
    return null
  }

  const user: User = {
    id: decoded.sub,
    name: decoded.name,
    email: decoded.email,
    role: decoded.role,
  }

  return user
}
