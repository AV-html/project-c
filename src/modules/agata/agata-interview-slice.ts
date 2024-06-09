import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import {
  createDialogs,
  finishInterview,
  getAllDialogs,
  getDialogHistoryById,
  getDialogInfoById,
  getNextQuestion,
  getReportById,
  sendVideoAnswer,
  startInterview
} from './agata-interview-thunk'
import {
  type IAgataState,
  type IDialog,
  type IDialogMessage,
  type IResDataGetDialogInfoById,
  type IResDataNextQuestion,
  type IResDataReportById
} from './agata-interview-types'

export const initialState: IAgataState = {
  isLoading: false,
  isLoadingCreateDialogs: false,
  isLoadingGetAllDialogs: false,
  isLoadingHistory: false,
  isLoadingInfo: false,

  dialogsList: [],
  createdDialogId: '',

  dialogInfo: null,
  dialogHistory: [],

  isLoadingReport: false,
  report: null
}

export const agataInterviewSlice = createSlice({
  name: 'agataInterviewSlice',
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    }
  },
  extraReducers: {
    [createDialogs.pending.type]: (state) => {
      state.isLoadingCreateDialogs = true
    },
    [createDialogs.fulfilled.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingCreateDialogs = false
      state.createdDialogId = action.payload
    },
    [createDialogs.rejected.type]: (state) => {
      state.isLoadingCreateDialogs = false
    },

    [getAllDialogs.pending.type]: (state) => {
      state.isLoadingGetAllDialogs = true
    },
    [getAllDialogs.fulfilled.type]: (state, action: PayloadAction<IDialog[]>) => {
      state.isLoadingGetAllDialogs = false
      state.dialogsList = action.payload
    },
    [getAllDialogs.rejected.type]: (state) => {
      state.isLoadingGetAllDialogs = false
    },

    [getDialogInfoById.pending.type]: (state) => {
      state.isLoadingInfo = true
    },
    [getDialogInfoById.fulfilled.type]: (state, action: PayloadAction<IResDataGetDialogInfoById>) => {
      state.isLoadingInfo = false
      state.dialogInfo = action.payload
    },
    [getDialogInfoById.rejected.type]: (state) => {
      state.isLoadingInfo = false
    },

    [startInterview.pending.type]: (state) => {
      state.isLoading = true
    },
    [startInterview.fulfilled.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      if (state.dialogInfo) {
        state.dialogInfo.startDate = action.payload
        state.dialogInfo.status = 'WAITING'
      }
    },
    [startInterview.rejected.type]: (state) => {
      state.isLoading = false
    },

    [getNextQuestion.pending.type]: (state) => {
      state.isLoading = true
    },
    [getNextQuestion.fulfilled.type]: (state, action: PayloadAction<IResDataNextQuestion>) => {
      state.isLoading = false
      state.dialogHistory.push(action.payload)
    },
    [getNextQuestion.rejected.type]: (state) => {
      state.isLoading = false
    },

    [getDialogHistoryById.pending.type]: (state) => {
      state.isLoadingHistory = true
    },
    [getDialogHistoryById.fulfilled.type]: (state, action: PayloadAction<IDialogMessage[]>) => {
      state.isLoadingHistory = false
      state.dialogHistory = action.payload
    },
    [getDialogHistoryById.rejected.type]: (state) => {
      state.isLoadingHistory = false
    },

    [sendVideoAnswer.pending.type]: (state) => {
      state.isLoading = true
    },
    [sendVideoAnswer.fulfilled.type]: (state, action: PayloadAction<IDialogMessage>) => {
      state.isLoading = false
      state.dialogHistory.push(action.payload)
      if (state.dialogInfo) {
        state.dialogInfo.questions.completed++
        state.dialogInfo.questions.current++
      }
    },
    [sendVideoAnswer.rejected.type]: (state) => {
      state.isLoading = false
    },

    [finishInterview.pending.type]: (state) => {
      state.isLoading = true
    },
    [finishInterview.fulfilled.type]: (state) => {
      state.isLoading = false
      if (state.dialogInfo) {
        state.dialogInfo.status = 'COMPLETED'
      }
    },
    [finishInterview.rejected.type]: (state) => {
      state.isLoading = false
    },

    [getReportById.pending.type]: (state) => {
      state.isLoadingReport = true
    },
    [getReportById.fulfilled.type]: (state, action: PayloadAction<IResDataReportById>) => {
      state.isLoadingReport = false
      state.report = action.payload
    },
    [getReportById.rejected.type]: (state) => {
      state.isLoadingReport = false
    }
  }
})

export const agataInterviewActions = agataInterviewSlice.actions

export const agataInterviewReducer = agataInterviewSlice.reducer
