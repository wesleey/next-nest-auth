import { AxiosInstance } from 'axios'
import { SignInData, SignUpData, Credentials } from '@/types/auth'
import { User } from '@/types/user'
import api from './api'

export class AuthService {
  private instance: AxiosInstance

  constructor(instance: AxiosInstance) {
    this.instance = instance
  }

  public setBearerToken(token: string) {
    this.instance.defaults.headers.common.Authorization = `Bearer ${token}`
  }

  public async login(signInData: SignInData) {
    return this.instance
      .post<Credentials>('auth/login', signInData)
      .then(({ data: credentials }) => credentials)
      .catch((error) => Promise.reject(error))
  }

  public async register(signUpData: SignUpData) {
    return this.instance
      .post<User>('auth/register', signUpData)
      .then(({ data: user }) => user)
      .catch((error) => Promise.reject(error))
  }

  public async refreshCredentials() {
    return this.instance
      .get<Credentials>('auth/refresh')
      .then(({ data: credentials }) => credentials)
      .catch((error) => Promise.reject(error))
  }

  public async logout() {
    return this.instance
      .get<void>('auth/logout')
      .then(({ data }) => data)
      .catch((error) => Promise.reject(error))
  }

  public async getUser() {
    return this.instance
      .get<User>('auth/profile')
      .then(({ data: user }) => user)
      .catch((error) => Promise.reject(error))
  }
}

export default new AuthService(api)
