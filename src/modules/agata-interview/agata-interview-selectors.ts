import { createSelector } from '@reduxjs/toolkit'

import type { TRootState } from 'app/store/store-types'

import { type IAgataState } from './agata-interview-types'

export const getAgataSelector = (state: TRootState): IAgataState => state?.agata

export const getDialogInfo = createSelector(
  getAgataSelector,
  (agata) => agata?.dialogInfo
)

export const getStatusDialog = createSelector(
  getAgataSelector,
  (agata) => agata?.dialogInfo?.status
)

export const getDialogHistory = createSelector(
  getAgataSelector,
  (agata) => agata?.dialogHistory
)

export const getHasHistory = createSelector(
  getAgataSelector,
  (agata) => agata?.dialogHistory.length > 0
)

export const getCurrentNumberQuestion = createSelector(
  getAgataSelector,
  (agata) => agata?.dialogInfo?.questions?.current
)

export const getIsBeforeFinishInterview = createSelector(
  getAgataSelector,
  (agata) => {
    const questions = agata?.dialogInfo?.questions
    return questions && (questions.completed === questions.total) && questions.total > 0
  }
)

export const getCompletedNumberQuestion = createSelector(
  getAgataSelector,
  (agata) => agata?.dialogInfo?.questions.completed
)

export const getTotalQuestion = createSelector(
  getAgataSelector,
  (agata) => agata?.dialogInfo?.questions.total
)

export const getIsLoading = createSelector(
  getAgataSelector,
  (agata) => agata?.isLoading
)

export const getIsLoadingHistory = createSelector(
  getAgataSelector,
  (agata) => agata?.isLoadingHistory
)
export const getIsLoadingInfo = createSelector(
  getAgataSelector,
  (agata) => agata?.isLoadingInfo
)
