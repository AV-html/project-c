import type { IReportInfo, TDialogStatus } from 'core/types/main'

export interface IReportData {
  questionsCount: number
  answersCount: number
  status: TDialogStatus
  questions: IQuestion[]
  final: string
  reportInfo: IReportInfo
}

export interface IQuestion {
  questionId: string
  question: string
  answer: string
  audio: string
  video: string
  grade: number
  error: string
}
