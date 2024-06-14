export interface IProfileData {
  info: {
    userId: number
    avatar: string
    firstName: string
    secondName: string
    birthDate: string
    aboutMe: string
    superForce: string
  }
  location: {
    country: string
    city: string
  }
  work: {
    job: string
    experience: string
    format: string
  }
  contact: {
    tg: string
    github: string
    phone: string
    email: string
  }
  workplace: IWorkplaceData[]
  skills: {
    userId: number
    junior: Record<string, boolean>
    middle: Record<string, boolean>
    senior: Record<string, boolean>
  }
}

interface IWorkplaceData {
  id: string

  name: string
  location: string
  position: string
  period: [string, string]
  tasks: string[]
  result: string[]
}
