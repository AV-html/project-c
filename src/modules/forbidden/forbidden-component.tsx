import { type FC } from 'react'

export interface IForbiddenProps {
}

export const ForbiddenComponent: FC<IForbiddenProps> = (props) => {
  console.log('Forbidden')

  return (
    <>
      Forbidden
    </>
  )
}
