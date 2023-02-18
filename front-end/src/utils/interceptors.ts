import { InternalAxiosRequestConfig, AxiosInstance } from 'axios'
import { parseCredentials, setCredentials } from './cookies'
import authService from '@/services/auth'

export function authRequestConfig(config: InternalAxiosRequestConfig) {
  const { accessToken } = parseCredentials()

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  return config
}

export async function authResponseError(error: any, instance: AxiosInstance) {
  const status = error.response.status

  const unauthorized = status === 401
  if (unauthorized) {
    const { refreshToken } = parseCredentials()

    const config = error.config
    if (refreshToken && !config._retry) {
      config._retry = true

      authService.setBearerToken(refreshToken)
      await authService.refreshCredentials().then((credentials) => {
        setCredentials(undefined, credentials)
      })

      return instance(config)
    }
  }

  return Promise.reject(error)
}
