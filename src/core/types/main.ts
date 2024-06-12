export type TCallBack = () => void

export interface IResponse<T = any> {
  data: T
}

export interface IResErrorData {
  errorsMessages: errorsMessages[]
}

interface errorsMessages {
  field: string
  message: string
}

export type TDialogStatus = 'NOT_STARTED' | 'WAITING' | 'ANALYSIS' | 'COMPLETED'

export interface IReportInfo {
  countQuestion: number
  scoreSum: number
  countErrors: number
}
