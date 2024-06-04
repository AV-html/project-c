import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { type TAppDispatch, type TRootState } from 'app/store/store-types'

export const useAppDispatch = (): TAppDispatch => useDispatch<TAppDispatch>()
export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector
