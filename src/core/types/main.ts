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
