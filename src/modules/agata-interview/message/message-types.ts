
import { type TAuthorMessage } from '../agata-interview-types'

export interface IMessageProps {
  author: TAuthorMessage
  createdDate?: string
  message?: string
  questionIndex?: number | null
  video?: string
}
