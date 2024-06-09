import { instanceAxios } from 'core/api/axios'

import {
  type IDialogMessage,
  type IResDataCreateDialogs,
  type IResDataGetDialogInfoById,
  type IResDataNextQuestion,
  type IResDataReportById,
  type IResDataStartInterview,
  type TResDataGetAllDialogs,
  type TResDataGetDialogHistoryById
} from './agata-interview-types'

export const agataInterviewApi = {
  createDialogs: async (companyId: string) => {
    return await instanceAxios.post<IResDataCreateDialogs>('/agata/dialogs', { companyId })
  },
  getAllDialogs: async () => {
    return await instanceAxios.get<TResDataGetAllDialogs>('/agata/dialogs')
  },
  getDialogInfoById: async (dialogId: string) => {
    return await instanceAxios.get<IResDataGetDialogInfoById>(`/agata/dialogs/${dialogId}/info`)
  },
  startInterview: async (dialogId: string) => {
    return await instanceAxios.get<IResDataStartInterview>(`/agata/dialogs/${dialogId}/start`)
  },
  getNextQuestion: async (dialogId: string) => {
    return await instanceAxios.get<IResDataNextQuestion>(`/agata/dialogs/${dialogId}/nextQuestion`)
  },
  getDialogHistoryById: async (dialogId: string) => {
    return await instanceAxios.get<TResDataGetDialogHistoryById>(`/agata/dialogs/${dialogId}/history`)
  },
  sendVideoAnswer: async (dialogId: string, formData: FormData, questionIndex: number) => {
    return await instanceAxios.post<IDialogMessage>(
      `/agata/dialogs/${dialogId}/answer?questionIndex=${questionIndex}`,
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    )
  },
  finishInterview: async (dialogId: string, feedback = '') => {
    return await instanceAxios.post(`/agata/dialogs/${dialogId}/finish`, { feedback })
  },
  getReportById: async (dialogId: string) => {
    return await instanceAxios.get<IResDataReportById>(`/agata/dialogs/${dialogId}/report`)
  }
}
