import { AgataInterviewPage } from 'pages/agata-interview-page'
import { ArticlePage } from 'pages/article-page'
import { AuthPage } from 'pages/auth-page'
import { CommunityPage } from 'pages/community-page'
import { NewsPage } from 'pages/news-page'
import { NotFoundPage } from 'pages/not-found-page'

import { type RouteConfig } from './app-router-types'

export enum AppRoutes {
  AUTH = 'auth',

  NEWS = 'news',
  EVENTS = 'events',
  EVENTS_CONFERENCE = 'events-conference',
  EVENTS_HACKATHON = 'events-hackathon',
  ARTICLE = 'article',
  COMMUNITY = 'community',

  AGATA_INTERVIEW_LIST = 'agata-interview-list',
  AGATA_INTERVIEW = 'agata-interview',

  NOT_FOUND = 'not-found', // 404
  FORBIDDEN = 'forbidden' // 403
}

export const goToAuthRoute = () => '/auth'
export const goToNewsRoute = () => '/news'
export const goToArticleByIdRoute = (id: string) => `/article/${id}`
export const goToCommunityRoute = () => '/community'

export const goToVacanciesRoute = () => '/vacancies'
export const goToVacancyRoute = (id: string) => `/vacancies/${id}`

export const goToTalentsRoute = () => '/talents'

export const goToAiHrRoute = () => '/ai-hr'

export const goToEventsRoute = () => '/events'
export const goToEventsConferenceRoute = () => '/events/conference'
export const goToEventsHackathonRoute = () => '/events/hackathon'

export const goToCoffeeRoute = () => '/coffee'

export const goToProfileRoute = (id: string) => `/profile/${id}`
export const goToProfileSkillsRoute = (id: string) => `/profile/${id}/skills`

export const goToAgataInterviewListRoute = () => '/interview'
export const goToAgataInterviewByIdRoute = (id: string) => `/interview/${id}`

export const goToForbiddenRoute = () => '/forbidden'
export const goToNotFoundRoute = () => '/not-found'

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.AUTH]: goToAuthRoute(),

  [AppRoutes.NEWS]: goToNewsRoute(),

  [AppRoutes.EVENTS]: goToEventsRoute(),
  [AppRoutes.EVENTS_CONFERENCE]: goToEventsConferenceRoute(),
  [AppRoutes.EVENTS_HACKATHON]: goToEventsHackathonRoute(),

  [AppRoutes.ARTICLE]: goToArticleByIdRoute(':articleId'),

  [AppRoutes.COMMUNITY]: goToCommunityRoute(),

  [AppRoutes.AGATA_INTERVIEW_LIST]: goToAgataInterviewListRoute(),
  [AppRoutes.AGATA_INTERVIEW]: goToAgataInterviewByIdRoute(':dialogId'),

  [AppRoutes.FORBIDDEN]: goToForbiddenRoute(),
  [AppRoutes.NOT_FOUND]: '*'
}

export const routes: RouteConfig[] = [
  {
    name: AppRoutes.AUTH,
    path: RoutePath.auth,
    element: <AuthPage/>
  },
  {
    name: AppRoutes.NEWS,
    path: RoutePath.news,
    element: <NewsPage/>
  },
  {
    name: AppRoutes.EVENTS,
    path: RoutePath.events,
    element: <div>События</div>
  },
  {
    name: AppRoutes.EVENTS_CONFERENCE,
    path: RoutePath['events-conference'],
    element: <div>События conference</div>
  },
  {
    name: AppRoutes.EVENTS_HACKATHON,
    path: RoutePath['events-hackathon'],
    element: <div>События hackathon</div>
  },
  {
    name: AppRoutes.ARTICLE,
    path: RoutePath.article,
    element: <ArticlePage/>
  },
  {
    name: AppRoutes.COMMUNITY,
    path: RoutePath.community,
    element: <CommunityPage/>
  },

  {
    name: AppRoutes.AGATA_INTERVIEW_LIST,
    path: RoutePath['agata-interview-list'],
    element: <div>agata-interview-list</div>
  },
  {
    name: AppRoutes.AGATA_INTERVIEW,
    path: RoutePath['agata-interview'],
    element: <AgataInterviewPage/>
  },

  {
    name: AppRoutes.NOT_FOUND,
    path: RoutePath['not-found'],
    element: <NotFoundPage/>
  },
  {
    name: AppRoutes.FORBIDDEN, // TODO: Сделать 403 page
    path: RoutePath.forbidden,
    element: <div>Доступ запрещён</div>
  }
]
