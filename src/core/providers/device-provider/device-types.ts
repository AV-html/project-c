import { type ReactNode } from 'react'

import { type SelectProps } from 'antd/es/select'

export interface IDeviceContextProps {
  microphoneDevicesOptions?: SelectProps['options']
  webcamDevicesOptions?: SelectProps['options']
  activeMicrophone?: string
  activeWebcam?: string
  setActiveMicrophone?: (activeMicrophone: string) => void
  setActiveWebcam?: (activeWebcam: string) => void
}

export interface IDeviceProviderProps {
  children: ReactNode
}
