import { type FC, type ReactNode } from 'react'

import { Provider } from 'react-redux'

import { createReduxStore } from '../store'
import { type TRootState } from '../store-types'

export interface IStoreProviderProps {
  children?: ReactNode
  initialState?: TRootState
}

export const StoreProvider: FC<IStoreProviderProps> = ({
  children,
  initialState
}) => {
  const store = createReduxStore(initialState)

  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}
