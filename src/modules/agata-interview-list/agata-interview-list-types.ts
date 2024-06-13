import type { TDialogStatus } from 'core/types/main'

export interface IDialogItem {
  dialogId: string
  status: TDialogStatus
  companyId: string
  companyName: string
  companyAvatar: string
  reportInfo: {
    countQuestion: number
    scoreSum: number
    countError: number
  }
}

export interface ICreateResData {
  dialogId: string
}
