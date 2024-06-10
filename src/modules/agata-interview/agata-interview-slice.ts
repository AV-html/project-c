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

  extraReducers: (builder) => {
    builder.addCase(createDialogs.pending.type, (state) => {
      state.isLoadingCreateDialogs = true
    });

    builder.addCase(createDialogs.fulfilled.type, (state, action: PayloadAction<string>) => {
      state.isLoadingCreateDialogs = false
      state.createdDialogId = action.payload
    });

    builder.addCase(createDialogs.rejected.type, (state) => {
      state.isLoadingCreateDialogs = false
    });

    builder.addCase(getAllDialogs.pending.type, (state) => {
      state.isLoadingGetAllDialogs = true
    });

    builder.addCase(
      getAllDialogs.fulfilled.type,
      (state, action: PayloadAction<IDialog[]>) => {
        state.isLoadingGetAllDialogs = false
        state.dialogsList = action.payload
      }
    );

    builder.addCase(getAllDialogs.rejected.type, (state) => {
      state.isLoadingGetAllDialogs = false
    });

    builder.addCase(getDialogInfoById.pending.type, (state) => {
      state.isLoadingInfo = true
    });

    builder.addCase(
      getDialogInfoById.fulfilled.type,
      (state, action: PayloadAction<IResDataGetDialogInfoById>) => {
        state.isLoadingInfo = false
        state.dialogInfo = action.payload
      }
    );

    builder.addCase(getDialogInfoById.rejected.type, (state) => {
      state.isLoadingInfo = false
    });

    builder.addCase(startInterview.pending.type, (state) => {
      state.isLoading = true
    });

    builder.addCase(startInterview.fulfilled.type, (state, action: PayloadAction<string>) => {
      state.isLoading = false
      if (state.dialogInfo) {
        state.dialogInfo.startDate = action.payload
        state.dialogInfo.status = 'WAITING'
      }
    });

    builder.addCase(startInterview.rejected.type, (state) => {
      state.isLoading = false
    });

    builder.addCase(getNextQuestion.pending.type, (state) => {
      state.isLoading = true
    });

    builder.addCase(
      getNextQuestion.fulfilled.type,
      (state, action: PayloadAction<IResDataNextQuestion>) => {
        state.isLoading = false
        state.dialogHistory.push(action.payload)
      }
    );

    builder.addCase(getNextQuestion.rejected.type, (state) => {
      state.isLoading = false
    });

    builder.addCase(getDialogHistoryById.pending.type, (state) => {
      state.isLoadingHistory = true
    });

    builder.addCase(
      getDialogHistoryById.fulfilled.type,
      (state, action: PayloadAction<IDialogMessage[]>) => {
        state.isLoadingHistory = false
        state.dialogHistory = action.payload
      }
    );

    builder.addCase(getDialogHistoryById.rejected.type, (state) => {
      state.isLoadingHistory = false
    });

    builder.addCase(sendVideoAnswer.pending.type, (state) => {
      state.isLoading = true
    });

    builder.addCase(
      sendVideoAnswer.fulfilled.type,
      (state, action: PayloadAction<IDialogMessage>) => {
        state.isLoading = false
        state.dialogHistory.push(action.payload)
        if (state.dialogInfo) {
          state.dialogInfo.questions.completed++
          state.dialogInfo.questions.current++
        }
      }
    );

    builder.addCase(sendVideoAnswer.rejected.type, (state) => {
      state.isLoading = false
    });

    builder.addCase(finishInterview.pending.type, (state) => {
      state.isLoading = true
    });

    builder.addCase(finishInterview.fulfilled.type, (state) => {
      state.isLoading = false
      if (state.dialogInfo) {
        state.dialogInfo.status = 'COMPLETED'
      }
    });

    builder.addCase(finishInterview.rejected.type, (state) => {
      state.isLoading = false
    });

    builder.addCase(getReportById.pending.type, (state) => {
      state.isLoadingReport = true
    });

    builder.addCase(
      getReportById.fulfilled.type,
      (state, action: PayloadAction<IResDataReportById>) => {
        state.isLoadingReport = false
        state.report = action.payload
      }
    );

    builder.addCase(getReportById.rejected.type, (state) => {
      state.isLoadingReport = false
    });
  }
})

export const agataInterviewActions = agataInterviewSlice.actions

export const agataInterviewReducer = agataInterviewSlice.reducer
