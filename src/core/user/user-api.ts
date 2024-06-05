
import { userActions } from './user-slice'
import type { IUserInfo } from './user-types'
import { rtkQueryApi } from '../api/rtk-query-api'
import { removeUserToken } from '../api/rtk-query-utils'

export const userApi = rtkQueryApi
  .enhanceEndpoints({ addTagTypes: ['user'] })
  .injectEndpoints({
    endpoints: (builder) => ({
      authMe: builder.query<IUserInfo | null, void>({
        query: () => ({
          url: '/auth/me',
          method: 'GET'
        }),
        onQueryStarted: async (_, { queryFulfilled, dispatch }) => {
          const { data } = await queryFulfilled
          if (data === null) {
            dispatch(userActions.setUserInfo(null))
            removeUserToken()
          }
        },
        providesTags: ['user']
      }),

      logout: builder.query<void, void>({
        query: () => ({
          url: '/auth/logout',
          method: 'DELETE'
        }),
        onQueryStarted: async (_, { queryFulfilled, dispatch }) => {
          await queryFulfilled
          dispatch(userActions.setUserInfo(null))
          removeUserToken()
        }
      })
    })
  })
