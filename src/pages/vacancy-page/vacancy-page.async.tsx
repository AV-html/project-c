import { lazy } from 'react'

export const VacancyPageAsync = lazy(async () => await import('./vacancy-page-component'))
