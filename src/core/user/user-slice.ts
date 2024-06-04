import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { type IUser, type IUserState } from './user-types'

export const initialState: IUserState = { userInfo: null }

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<IUser | null>) => {
      state.userInfo = action.payload
    }
  }
})

export const userActions = userSlice.actions

export const userReducer = userSlice.reducer
