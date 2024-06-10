import {
  type BaseQueryApi, createApi, type FetchArgs, fetchBaseQuery
} from '@reduxjs/toolkit/dist/query/react'

import { API_URL } from './rtk-query-constants'
import { getUserToken, removeUserToken } from './rtk-query-utils'
import { userActions } from '../user/user-slice'

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
    api.dispatch(userActions.setUserInfo(null))
    // TODO: Возможно достаточно удалить userInfo. Подумать
  }

  return query
}

export const rtkQueryApi = createApi({
  reducerPath: 'rtkQueryApi',
  baseQuery,
  endpoints: () => ({})
})
