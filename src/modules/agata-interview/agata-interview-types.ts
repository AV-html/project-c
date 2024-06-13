import type { TDialogStatus } from 'core/types/main'

export interface IAgataState {
  isLoading: boolean
  isLoadingCreateDialogs: boolean
  isLoadingGetAllDialogs: boolean
  isLoadingHistory: boolean
  isLoadingInfo: boolean

  dialogsList: IDialog[]
  createdDialogId: string

  dialogInfo: IResDataGetDialogInfoById | null
  dialogHistory: IDialogMessage[]

  isLoadingReport: boolean
  report: IResDataReportById | null
}

export interface IResDataCreateDialogs {
  dialogId: string
}

export type TResDataGetAllDialogs = IDialog[]

export interface IDialog {
  dialogId: string
  companyId: string
  companyName: string
  companyAvatar: null
  status: TDialogStatus
}

export interface IResDataGetDialogInfoById {
  startDate: string

  dialogId: string
  description: string
  status: TDialogStatus

  company: {
    id: string
    name: string
    avatar: string
  }

  questions: {
    total: number
    completed: number
    current: number
  }
}

export interface IResDataStartInterview {
  startDate: string
}

export type TAuthorMessage = 'agata' | 'user'

export interface IResDataNextQuestion {
  createdDate: string
  endDate: string
  messageId: string
  message: string
  author: TAuthorMessage
  questionIndex: number
}

export type TResDataGetDialogHistoryById = IDialogMessage[]

export interface IVideoData {
  preview: string
  link: string
}

export interface IDialogMessage {
  createdDate: string
  endDate: string
  messageId: string
  message: string
  author: TAuthorMessage
  questionIndex: number | null
  video?: IVideoData | null
}

export interface IResDataReportById {
  questionsCount: number
  answersCount: number
  status: TDialogStatus
  questions: IQuestionsReport[]
  feedback: string
  final: string
}

export interface IQuestionsReport {
  question: string
  answer: string
  audio: string
  video: string
  error: string
  grade: number
}
