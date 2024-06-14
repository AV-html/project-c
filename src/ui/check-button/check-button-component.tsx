import { type FC } from 'react'

import type { ICheckButtonProps } from './check-button-types'

import styles from './check-button.module.scss'

export const CheckButtonComponent: FC<ICheckButtonProps> = ({
  className,
  children,
  ...restProps
}) => {
  return (
    <label className={className}>
      <input className={styles.input} data-hidden={true} type={'checkbox'} {...restProps} />
      <span className={styles.span}>{children}</span>
    </label>
  )
}
