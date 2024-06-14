export interface IFullVacancyData {
  company: {
    id: string
    name: string
    logo: string
  }
  vacancyId: number
  title: string
  city: string
  format: string
  namespace: string
  position: string
  tags: string[]
  tasks: string[]
  skills: string[]
  isFavorite: boolean
  link: string
  description: string
  methods: string[]
  advantages: string[]
  conditions: string[]
  team: string[]
  dialogId: string
}
