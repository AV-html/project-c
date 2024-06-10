import { lazy } from 'react'

export const ForbiddenPageAsync = lazy(async () => await import('./forbidden-page-component'))
