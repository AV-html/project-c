import { createAsyncThunk } from '@reduxjs/toolkit'
import { message } from 'antd'

import type { TRootState } from 'app/store/store-types'

import { agataInterviewApi } from './agata-interview-api'
import { getTotalQuestion } from './agata-interview-selectors'
import {
  type IDialog, type IDialogMessage,
  type IResDataGetDialogInfoById,
  type IResDataNextQuestion, type IResDataReportById,
  type TResDataGetDialogHistoryById
} from './agata-interview-types'

export const createDialogs = createAsyncThunk<string, string>(
  'agata-interview/createDialogs',
  async (companyId) => {
    try {
      const res = await agataInterviewApi.createDialogs(companyId)
      return res.data.dialogId
    } catch (e) {
      await message.error('Не удалось создать диалог с Агатой')
      return e
    }
  }
)

export const getAllDialogs = createAsyncThunk<IDialog[]>(
  'agata-interview/getAllDialogs',
  async (_) => {
    try {
      const res = await agataInterviewApi.getAllDialogs()
      return res.data
    } catch (e) {
      await message.error('Не удалось получить список диалогов с Агатой')
      return e
    }
  }
)

export const getDialogInfoById = createAsyncThunk<IResDataGetDialogInfoById, string>(
  'agata-interview/getDialogInfoById',
  async (dialogId) => {
    try {
      const res = await agataInterviewApi.getDialogInfoById(dialogId)
      return res.data
    } catch (e) {
      await message.error('Не удалось получить информацию о диалоге с Агатой')
      return e
    }
  }
)

export const startInterview = createAsyncThunk<string, string>(
  'agata-interview/startInterview',
  async (dialogId, thunkAPI) => {
    try {
      const res = await agataInterviewApi.startInterview(dialogId)
      await thunkAPI.dispatch(getNextQuestion(dialogId))
      return res.data.startDate // TODO: Здесь можно создать момент начала интервью
    } catch (e) {
      await message.error('Не удалось начать интервью с Агатой')
      return e
    }
  }
)

export const getNextQuestion = createAsyncThunk<IResDataNextQuestion, string>(
  'agata-interview/getNextQuestion',
  async (dialogId) => {
    try {
      const res = await agataInterviewApi.getNextQuestion(dialogId)
      return res.data
    } catch (e) {
      await message.error('Не удалось получить новый вопрос от Агаты')
      return e
    }
  }
)

export const getDialogHistoryById = createAsyncThunk<TResDataGetDialogHistoryById, string>(
  'agata-interview/getDialogHistoryById',
  async (dialogId) => {
    try {
      const res = await agataInterviewApi.getDialogHistoryById(dialogId)
      return res.data
    } catch (e) {
      await message.error('Не удалось загрузить историю интервью с Агатой')
      return e
    }
  }
)

export const sendVideoAnswer = createAsyncThunk<IDialogMessage, {
  dialogId: string
  formData: FormData
  questionIndex: number
}>(
  'agata-interview/sendVideoAnswer',
  async ({
    dialogId,
    formData,
    questionIndex
  }, thunkAPI) => {
    try {
      console.log(dialogId, formData, questionIndex)
      const res = await agataInterviewApi.sendVideoAnswer(dialogId, formData, questionIndex)
      const state = thunkAPI.getState()
      const totalQuestion = getTotalQuestion(state as TRootState) as number
      if (questionIndex <= totalQuestion) {
        void thunkAPI.dispatch(getNextQuestion(dialogId))
      } else {
        // TODO: Должно появиться поле для feedback
      }
      return res.data
    } catch (e) {
      await message.error('Не удалось отправить ответ')
      return e
    }
  }
)

export const finishInterview = createAsyncThunk<unknown, { dialogId: string, feedback?: string }>(
  'agata-interview/finishInterview',
  async ({ dialogId, feedback }) => {
    try {
      await agataInterviewApi.finishInterview(dialogId, feedback)
    } catch (e) {
      await message.error('Не удалось завершить интервью')
      return e
    }
  }
)

export const getReportById = createAsyncThunk<IResDataReportById, string>(
  'agata-interview/getReportById',
  async (dialogId) => {
    try {
      const res = await agataInterviewApi.getReportById(dialogId)
      return res.data
    } catch (e) {
      await message.error('Не удалось завершить интервью')
      return e
    }
  }
)
