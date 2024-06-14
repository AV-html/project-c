import { rtkQueryApi } from 'core/api/rtk-query-api'

import type { IVacanciesData, IVacancy } from './vacancies-types'

export const vacanciesApi = rtkQueryApi.injectEndpoints({
  endpoints: (builder) => ({
    getVacancies: builder.query<IVacancy[], void>({
      query: () => ({
        url: '/vacancies',
        method: 'GET'
      }),
      transformResponse: (res: IVacanciesData) => res.data
    }),

    getVacanciesRNTGroup: builder.query<IVacancy[], void>({
      query: () => ({
        url: '/vacancies/rntgroup',
        method: 'GET'
      }),
      transformResponse: (res: IVacanciesData) => res.data
    })
  })
})
