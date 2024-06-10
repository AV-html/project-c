import { lazy } from 'react'

export const TalentsPageAsync = lazy(async () => await import('./talents-page-component'))
