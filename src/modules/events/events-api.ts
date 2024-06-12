import { rtkQueryApi } from 'core/api/rtk-query-api'

import { IEvents } from './events-types'

export const eventApi = rtkQueryApi.injectEndpoints({
  endpoints: (builder) => ({
    getEvents: builder.query<IEvents, void>({
      query: () => ({
        url: '/event',
        method: 'GET'
      })
    })
  })
})
