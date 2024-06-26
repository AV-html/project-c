import type { TDialogStatus } from 'core/types/main'

export const statusToText: Record<TDialogStatus, string> = {
  NOT_STARTED: 'Новое',
  WAITING: 'В процессе',
  ANALYSIS: 'В обработке',
  COMPLETED: 'Завершено'
} as const

export const statusToColor: Record<TDialogStatus, string> = {
  NOT_STARTED: '#EAF3FD',
  WAITING: '#FDF1EB',
  ANALYSIS: '#FDF1EB',
  COMPLETED: '#D4ECE4'
} as const

export const statusToBtnText: Record<TDialogStatus, string> = {
  NOT_STARTED: 'Начать',
  WAITING: 'Подключиться к интервью',
  ANALYSIS: 'Посмотреть',
  COMPLETED: 'История'
} as const
