type Tag = string | string[]

interface IEvent {
  id?: number
  preview?: string
  title?: string
  link?: string
  tags?: Tag[]
  description?: string
  position?: string
  dateText?: string
  date?: string
  cost?: string
  isTranslation?: boolean
}

export interface IEvents {
  news: IEvent[]
  conference: IEvent[]
  hakaton: IEvent[]
}
