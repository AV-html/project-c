import { createContext } from 'react'

import { type IDeviceContextProps } from './device-types'

export const DeviceContext = createContext<IDeviceContextProps>({})
