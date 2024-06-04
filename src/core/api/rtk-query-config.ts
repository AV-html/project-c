import { type BaseQueryApi, type FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { API_URL, LOCAL_STORAGE_TOKEN_KEY } from './rtk-query-constants'

export const baseQuery = async (
  args: FetchArgs,
  api: BaseQueryApi,
  extraOptions: any
) => {
  const query = await fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      headers.set('accept', 'application/json')
      return headers
    }
  })(args, api, extraOptions)

  return query
}
