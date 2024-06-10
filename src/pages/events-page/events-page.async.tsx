import { lazy } from 'react'

export const EventsPageAsync = lazy(async () => await import('./events-page-component'))
