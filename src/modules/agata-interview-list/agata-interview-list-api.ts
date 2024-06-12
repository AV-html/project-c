import { rtkQueryApi } from 'core/api/rtk-query-api'

import type { IDialogItem } from './agata-interview-list-types'

export const agataInterviewApi = rtkQueryApi.injectEndpoints({
  endpoints: (builder) => ({
    getAgataDialogs: builder.query<IDialogItem[], void>({
      query: () => ({
        url: '/agata/dialogs',
        method: 'GET'
      })
    })
  })
})
