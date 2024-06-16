export interface IResponseTalentsData {
  data: ITalentData[]
}

export interface ITalentData {
  id: string
  avatar: string
  firstName: string
  secondName: string
  job: string
  position: string
  location: {
    country: string
    city: string
  }
  experience: string
  skills: {
    skills: {
      junior: Record<string, boolean>
      middle: Record<string, boolean>
      senior: Record<string, boolean>
    }
  }
}
