import { type ThunkDispatch, type UnknownAction } from '@reduxjs/toolkit'

import { type rootReducer } from './store'

export type TRootState = ReturnType<typeof rootReducer>
export type TAppDispatch = ThunkDispatch<TRootState, undefined, UnknownAction>
