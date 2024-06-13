export interface IVacanciesData {
  data: IVacancy[]
}

export interface IVacancy {
  company: {
    id: string
    name: string
    logo: string
  }
  vacancyId: number
  title: string
  city: string
  format: string
  position: string
  tags: string[]
  tasks: string[]
  skills: string[]
  isFavorite: boolean
  link: string
}
