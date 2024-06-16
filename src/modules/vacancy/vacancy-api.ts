import { rtkQueryApi } from 'core/api/rtk-query-api'

import type { IFullVacancyData } from './vacancy-types'

export const vacancyApi = rtkQueryApi
  .enhanceEndpoints({ addTagTypes: ['vacancy'] })
  .injectEndpoints({

    endpoints: (builder) => ({
      getVacanciesById: builder.query<IFullVacancyData, string>({
        query: (id) => ({
          url: `/vacancies/${id}`,
          method: 'GET'
        }),
        transformResponse: (res: { data: IFullVacancyData }) => res.data,
        providesTags: ['vacancy']
      })
    })
  })
