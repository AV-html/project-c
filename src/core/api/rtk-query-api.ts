import {
  type BaseQueryApi, createApi, type FetchArgs, fetchBaseQuery
} from '@reduxjs/toolkit/query/react'

import { goToAuthRoute } from 'app/app-router/app-router-configs'

import { API_URL } from './rtk-query-constants'
import { getUserToken, removeUserToken } from './rtk-query-utils'

export const baseQuery = async (
  args: FetchArgs,
  api: BaseQueryApi,
  extraOptions: any
) => {
  const query = await fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      const token = getUserToken()
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    }
  })(args, api, extraOptions)

  if (query.error?.status === 401) {
    removeUserToken()
    window.location.replace(`${window.location.origin}/${goToAuthRoute()}`)
    // TODO: Возможно достаточно удалить userInfo. Подумать
  }

  return query
}

export const rtkQueryApi = createApi({
  reducerPath: 'rtkQueryApi',
  baseQuery,
  endpoints: () => ({})
})
