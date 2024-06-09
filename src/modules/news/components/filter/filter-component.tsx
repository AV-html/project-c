import { type FC } from 'react'

import styles from './filter.module.css'

export interface IFilterProps {
  title: string
}

export const FilterComponent: FC<IFilterProps> = ({ title }) => {
  return <button className={styles.filter}>{title}</button>
}
