import type { IVacancy } from '../../vacancies-types'

export interface IComponentsProps extends IVacancy {
  namespace: 'reksoft' | 'commit'
}
