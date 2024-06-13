import type { IVacancy } from './vacancies-types'

export const callbackMainVacancies = (vacancy: IVacancy) => {
  return vacancy.title.includes('react') ||
    vacancy.title.includes('Фронт') ||
    vacancy.title.includes('React') ||
    vacancy.title.includes('Front-end') ||
    vacancy.title.includes('Frontend')
}
