import { lazy } from 'react'

export const ArticlePageAsync = lazy(async () => await import('./article-page-component'))
