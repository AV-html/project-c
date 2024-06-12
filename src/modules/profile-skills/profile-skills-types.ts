type Junior = Record<string, boolean>

type Middle = Record<string, boolean>

type Senior = Record<string, boolean>

export interface IUserSkills {
  userId: number
  junior: Junior
  middle: Middle
  senior: Senior
}

export interface IGetDataSkills {
  data: IUserSkills
}
