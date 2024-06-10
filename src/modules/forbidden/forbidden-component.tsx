import {FC} from 'react'

import styles from './forbidden.module.scss'

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


