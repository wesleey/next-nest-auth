import { AxiosInstance } from 'axios'
import { User } from '@/types/user'
import api from './api'

export class UserService {
  private instance: AxiosInstance

  constructor(instance: AxiosInstance) {
    this.instance = instance
  }

  public async all() {
    return this.instance
      .get<User[]>('users')
      .then(({ data: users }) => users)
      .catch((error) => Promise.reject(error))
  }

  public async find(id: string) {
    return this.instance
      .get<User>('users/' + id)
      .then(({ data: user }) => user)
      .catch((error) => Promise.reject(error))
  }
}

export default new UserService(api)
