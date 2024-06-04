export interface IMeta {
  current_page: number
  from: number
  last_page: number
  per_page: number
  to: number
  total: number
}

export interface IResultWithoutData {
  meta?: IMeta
  result: boolean
  message: string
}

export interface IResult<T = any> extends IResultWithoutData {
  data: T
}
