import { rtkQueryApi } from 'core/api/rtk-query-api'

import type { ICreateResData, IDialogItem, ITestCompany } from './agata-interview-list-types'

export const agataInterviewApi = rtkQueryApi
  .enhanceEndpoints({ addTagTypes: ['interview'] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getAgataDialogs: builder.query<IDialogItem[], void>({
        query: () => ({
          url: '/agata/dialogs',
          method: 'GET'
        }),
        providesTags: ['interview']
      }),

      getTestCompanyId: builder.query<ITestCompany, void>({
        query: () => ({
          url: '/agata/dialogs/test',
          method: 'GET'
        })
      }),

      createAgataDialog: builder.mutation<ICreateResData, string>({
        query: (companyId) => ({
          url: '/agata/dialogs',
          method: 'POST',
          body: { companyId }
        }),
        invalidatesTags: ['interview']
      })
    })
  })
