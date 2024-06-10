import { lazy } from 'react'

export const ProfilePageAsync = lazy(async () => await import('./profile-page-component'))
