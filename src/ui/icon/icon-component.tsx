import React from 'react'

import { icons } from './icon-configs'
import { type IconProps } from './icon-types'

export const IconComponent: React.FC<IconProps> = ({
  name,
  className,
  size = 24,
  color
}) => {
  const SelectedIcon = icons[name]

  return (
    <SelectedIcon
      className={className}
      width={size}
      height={size}
      style={{ color }}
    />
  )
}
