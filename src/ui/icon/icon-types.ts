import { type icons } from './icon-configs'

export type TIconName = keyof typeof icons

export interface IconProps {
  name: TIconName
  className?: string
  size?: number | string
  color?: string
}
