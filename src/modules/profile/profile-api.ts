
import { rtkQueryApi } from 'core/api/rtk-query-api'

import type { IProfileData } from './profile-types'

export const profileApi = rtkQueryApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<IProfileData, string>({
      query: (id) => ({
        url: `/profile/${id}`,
        method: 'GET'
      }),
      transformResponse: (res: { data: IProfileData }) => res.data
    })
  })
})
