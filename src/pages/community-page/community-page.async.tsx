import { lazy } from 'react'

export const CommunityPageAsync = lazy(async () => await import('./community-page-component'))
