import { rtkQueryApi } from 'core/api/rtk-query-api'

export const vacancyApi = rtkQueryApi.injectEndpoints({
  endpoints: (builder) => ({
    getVacanciesById: builder.query<any, string>({
      query: (id) => ({
        url: `/vacancies/${id}`,
        method: 'GET'
      }),
      transformResponse: (res: { data: any }) => res.data
    })
  })
})
