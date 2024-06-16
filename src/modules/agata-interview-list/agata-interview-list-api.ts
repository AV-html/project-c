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
        keepUnusedDataFor: 0,
        providesTags: ['interview']
      }),

      getTestCompanyId: builder.query<ITestCompany, void>({
        query: () => ({
          url: '/agata/dialogs/test',
          method: 'GET'
        }),
        keepUnusedDataFor: 0
      }),

      createAgataDialog: builder.mutation<ICreateResData, string>({
        query: (companyId) => ({
          url: '/agata/dialogs',
          method: 'POST',
          body: { companyId }
        }),
        invalidatesTags: ['interview']
      }),

      removeAgataDialog: builder.mutation<void, string>({
        query: (dialogId) => ({
          url: `/agata/dialogs/${dialogId}`,
          method: 'DELETE'
        }),
        invalidatesTags: ['interview']
      })
    })
  })
