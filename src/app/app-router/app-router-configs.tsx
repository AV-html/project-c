import { AgataInterviewListPage } from 'pages/agata-interview-list-page'
import { AgataInterviewPage } from 'pages/agata-interview-page'
import { AgataInterviewReportPage } from 'pages/agata-interview-report-page'
import { ArticlePage } from 'pages/article-page'
import { AuthPage } from 'pages/auth-page'
import { CommunityPage } from 'pages/community-page'
import { EventsConferencePage } from 'pages/events-conference-page'
import { EventsHackathonPage } from 'pages/events-hackathon-page'
import { EventsPage } from 'pages/events-page'
import { ForbiddenPage } from 'pages/forbidden-page'
import { NewsPage } from 'pages/news-page'
import { NotFoundPage } from 'pages/not-found-page'
import { ProfilePage } from 'pages/profile-page'
import { ProfileSkillsPage } from 'pages/profile-skills-page'
import { TalentsPage } from 'pages/talents-page'
import { VacanciesPage } from 'pages/vacancies-page'
import { VacanciesStepsPage } from 'pages/vacancies-steps-page'
import { VacancyPage } from 'pages/vacancy-page'

import { type RouteConfig } from './app-router-types'

export enum AppRoutes {
  AUTH = 'auth',

  NEWS = 'news',
  EVENTS = 'events',
  EVENTS_CONFERENCE = 'events-conference',
  EVENTS_HACKATHON = 'events-hackathon',
  ARTICLE = 'article',
  COMMUNITY = 'community',
  VACANCIES = 'vacancies',
  VACANCIES_STEPS = 'vacancies-steps',
  VACANCY = 'vacancy',
  TALENTS = 'talents',
  PROFILE = 'profile',
  PROFILE_SKILLS = 'profile-skills',

  AGATA_INTERVIEW_LIST = 'agata-interview-list',
  AGATA_INTERVIEW = 'agata-interview',
  AGATA_INTERVIEW_REPORT = 'agata-interview-report',

  NOT_FOUND = 'not-found', // 404
  FORBIDDEN = 'forbidden' // 403
}

export const goToNewsRoute = () => '/'
export const goToAuthRoute = () => '/auth'
export const goToArticleByIdRoute = (id: string) => `/article/${id}`
export const goToCommunityRoute = () => '/community'

export const goToVacanciesRoute = () => '/vacancies'
export const goToVacancyRoute = (id: string) => `/vacancies/${id}`
export const goToVacanciesStepsRoute = () => '/vacancies-steps'

export const goToTalentsRoute = () => '/talents'

export const goToAiHrRoute = () => '/ai-hr'

export const goToEventsRoute = () => '/events'
export const goToEventsConferenceRoute = () => '/events/conference'
export const goToEventsHackathonRoute = () => '/events/hackathon'

export const goToProfileRoute = (id: string) => `/profile/${id}`
export const goToProfileSkillsRoute = (id: string) => `/profile/${id}/skills`

export const goToAgataInterviewListRoute = () => '/interview'
export const goToAgataInterviewByIdRoute = (id: string) => `/interview/${id}`
export const goToAgataInterviewReportRoute = (id: string) => `/interview/${id}/report`

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
  [AppRoutes.VACANCIES]: goToVacanciesRoute(),
  [AppRoutes.VACANCY]: goToVacancyRoute(':vacancyId'),
  [AppRoutes.VACANCIES_STEPS]: goToVacanciesStepsRoute(),
  [AppRoutes.TALENTS]: goToTalentsRoute(),
  [AppRoutes.PROFILE]: goToProfileRoute(':profileId'),
  [AppRoutes.PROFILE_SKILLS]: goToProfileSkillsRoute(':skillId:'),

  [AppRoutes.AGATA_INTERVIEW_LIST]: goToAgataInterviewListRoute(),
  [AppRoutes.AGATA_INTERVIEW]: goToAgataInterviewByIdRoute(':dialogId'),
  [AppRoutes.AGATA_INTERVIEW_REPORT]: goToAgataInterviewReportRoute(':dialogId'),

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
    element: <EventsPage/>
  },
  {
    name: AppRoutes.EVENTS_CONFERENCE,
    path: RoutePath['events-conference'],
    element: <EventsConferencePage/>
  },
  {
    name: AppRoutes.EVENTS_HACKATHON,
    path: RoutePath['events-hackathon'],
    element: <EventsHackathonPage/>
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
    name: AppRoutes.VACANCIES_STEPS,
    path: RoutePath['vacancies-steps'],
    element: <VacanciesStepsPage/>,
    authOnly: true
  },
  {
    name: AppRoutes.AGATA_INTERVIEW_LIST,
    path: RoutePath['agata-interview-list'],
    element: <AgataInterviewListPage/>,
    authOnly: true
  },
  {
    name: AppRoutes.AGATA_INTERVIEW,
    path: RoutePath['agata-interview'],
    element: <AgataInterviewPage/>,
    authOnly: true
  },
  {
    name: AppRoutes.AGATA_INTERVIEW_REPORT,
    path: RoutePath['agata-interview-report'],
    element: <AgataInterviewReportPage/>,
    authOnly: true
  },

  {
    name: AppRoutes.NOT_FOUND,
    path: RoutePath['not-found'],
    element: <NotFoundPage/>
  },
  {
    name: AppRoutes.FORBIDDEN,
    path: RoutePath.forbidden,
    element: <ForbiddenPage/>
  },
  {
    name: AppRoutes.VACANCIES,
    path: RoutePath.vacancies,
    element: <VacanciesPage/>
  },
  {
    name: AppRoutes.VACANCY,
    path: RoutePath.vacancy,
    element: <VacancyPage/>
  },
  {
    name: AppRoutes.TALENTS,
    path: RoutePath.talents,
    element: <TalentsPage/>
  },
  {
    name: AppRoutes.PROFILE,
    path: RoutePath.profile,
    element: <ProfilePage/>
  },
  {
    name: AppRoutes.PROFILE_SKILLS,
    path: RoutePath['profile-skills'],
    element: <ProfileSkillsPage/>
  }
]
