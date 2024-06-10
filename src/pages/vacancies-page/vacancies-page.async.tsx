import { lazy } from 'react'

export const VacanciesPageAsync = lazy(async () => await import('./vacancies-page-component'))
