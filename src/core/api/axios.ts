import axios from 'axios'

import { API_URL } from './rtk-query-constants'

const instanceAxios = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' }
})

instanceAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  }
)

export { instanceAxios }
