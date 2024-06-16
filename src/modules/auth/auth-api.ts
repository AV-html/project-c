import { rtkQueryApi } from 'core/api/rtk-query-api'
import { setUserToken } from 'core/api/rtk-query-utils'
import { userActions } from 'core/user/user-slice'

import type { ILoginRequest, ILoginResponse, IRegRequest } from './auth-types'

export const authApi = rtkQueryApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<ILoginResponse, ILoginRequest>({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled

          if (data) {
            const { token, ...userInfo } = data

            dispatch(userActions.setUserInfo(userInfo))
            setUserToken(token)
          }
        } catch (e) {}
      }
    }),

    registration: builder.mutation<void, IRegRequest>({
      query: (body) => ({
        url: '/auth/registration',
        method: 'POST',
        body
      })
    })
  })
})
