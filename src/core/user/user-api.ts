
import { type IUser } from './user-types'
import { rtkQueryApi } from '../api/rtk-query-api'
import type { IResult, IResultWithoutData } from '../types/main'

export const userApi = rtkQueryApi
  .enhanceEndpoints({ addTagTypes: ['user'] })
  .injectEndpoints({
    endpoints: (builder) => ({
      authMe: builder.query<IUser, void>({
        query: () => ({
          url: 'users/info',
          method: 'GET'
        }),
        transformResponse: (result: IResult<IUser>) => result.data,
        providesTags: ['user']
      }),

      logout: builder.query<IResultWithoutData, void>({
        query: () => ({
          url: 'logout',
          method: 'GET'
        })
      })
    })
  })
