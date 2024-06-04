
import { rtkQueryApi } from 'core/api/rtk-query-api'
import type { IResult } from 'core/types/main'

import type { ILoginResponse } from './auth-types'
import type { ILoginForm } from './login-form/login-form-types'

export const authApi = rtkQueryApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.query<ILoginResponse, ILoginForm>({
      query: ({
        login,
        password,
        isLdap
      }) => ({
        url: 'login',
        method: 'POST',
        body: {
          login,
          password,
          is_ldap: isLdap
        }
      }),
      transformResponse: (result: IResult<ILoginResponse>) => result.data
    })
  })
})
