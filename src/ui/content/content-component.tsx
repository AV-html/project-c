import { type FC } from 'react'

import { cn } from 'core/utils/class-names'

import { type IContentProps } from './content-types'

import styles from './content.module.scss'

export const ContentComponent: FC<IContentProps> = ({
  children,
  className
}) => {
  return (
    <div className={cn(styles.content, [className])}>
      {children}
    </div>
  )
}
