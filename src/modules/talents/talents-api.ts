import { rtkQueryApi } from 'core/api/rtk-query-api'

import type { IResponseTalentsData } from './talents-types'

export const talentsApi = rtkQueryApi.injectEndpoints({
  endpoints: (builder) => ({
    getTalents: builder.query<IResponseTalentsData, void>({
      query: () => ({
        url: '/talents',
        method: 'GET'
      })
    })
  })
})
