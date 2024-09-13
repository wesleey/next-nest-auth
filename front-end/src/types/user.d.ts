export type Role = 'USER' | 'ADMIN'

export type User = {
  id: string
  name: string
  email: string
  role: Role
}
