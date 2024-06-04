import { createApi } from '@reduxjs/toolkit/query/react'

import { baseQuery } from './rtk-query-config'

export const rtkQueryApi = createApi({
  reducerPath: 'rtkQueryApi',
  baseQuery,
  endpoints: () => ({})
})
