import { LOCAL_STORAGE_TOKEN_KEY } from './rtk-query-constants'

export const removeUserToken = () => {
  localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY)
}

export const getUserToken = () => {
  return localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)
}

export const setUserToken = (token: string) => {
  localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token)
}
