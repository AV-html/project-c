import { useCallback, useContext } from 'react'

import { DEVICE_MICROPHONE_KEY, DEVICE_WEBCAM_KEY } from './device-constants'
import { DeviceContext } from './device-context'
import { type IDeviceContextProps } from './device-types'

export const useDevice = (): IDeviceContextProps => {
  const {
    microphoneDevicesOptions,
    webcamDevicesOptions,
    activeMicrophone,
    activeWebcam,
    setActiveMicrophone,
    setActiveWebcam
  } = useContext(DeviceContext)

  const changeActiveMicrophone = useCallback((activeMicrophone: string) => {
    localStorage.setItem(DEVICE_MICROPHONE_KEY, activeMicrophone)
    setActiveMicrophone?.(activeMicrophone)
  }, [])

  const changeActiveWebcam = useCallback((activeWebcam: string) => {
    localStorage.setItem(DEVICE_WEBCAM_KEY, activeWebcam)
    setActiveWebcam?.(activeWebcam)
  }, [])

  return {
    microphoneDevicesOptions,
    webcamDevicesOptions,
    activeMicrophone,
    activeWebcam,
    setActiveMicrophone: changeActiveMicrophone,
    setActiveWebcam: changeActiveWebcam
  }
}
