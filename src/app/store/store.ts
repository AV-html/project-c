import { combineReducers, configureStore, type Middleware } from '@reduxjs/toolkit'

import { rtkQueryApi } from 'core/api/rtk-query-api'
import { rtkQueryErrorMiddleware } from 'core/api/rtk-query-middleware'
import { userReducer } from 'core/user/user-slice'

import { type TRootState } from './store-types'

export const rootReducer = combineReducers({
  user: userReducer,
  [rtkQueryApi.reducerPath]: rtkQueryApi.reducer
})

export const createReduxStore = (initialState?: TRootState) => {
  const backApi: Middleware[] = [
    rtkQueryApi.middleware,
    rtkQueryErrorMiddleware
  ]

  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }).concat(backApi),
    devTools: __IS_DEV__,
    preloadedState: initialState
  })
}
