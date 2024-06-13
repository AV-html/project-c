import { rtkQueryApi } from 'core/api/rtk-query-api'

import type { ICreateResData, IDialogItem } from './agata-interview-list-types'

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
