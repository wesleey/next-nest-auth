import axios from 'axios'
import { authRequestConfig, authResponseError } from '@/utils/interceptors'

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

instance.interceptors.request.use(
  (config) => {
    return authRequestConfig(config)
  },
  (error) => {
    return Promise.reject(error)
  },
)

instance.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    return authResponseError(error, instance)
  },
)

export default instance
