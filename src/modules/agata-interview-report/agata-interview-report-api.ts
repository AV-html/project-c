import { rtkQueryApi } from 'core/api/rtk-query-api'

import type { IReportData } from './agata-interview-report-types'

export const agataInterviewReportApi = rtkQueryApi.injectEndpoints({
  endpoints: (builder) => ({
    getReportById: builder.query<IReportData, string>({
      query: (id) => ({
        url: `/agata/dialogs/${id}/report`,
        method: 'GET'
      })
    })
  })
})
