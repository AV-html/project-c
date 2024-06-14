import { type FC, useEffect, useState } from 'react'

import { type SelectProps } from 'antd/es/select'

import { DEVICE_MICROPHONE_KEY, DEVICE_WEBCAM_KEY } from './device-constants'
import { DeviceContext } from './device-context'
import { type IDeviceProviderProps } from './device-types'

export const DeviceProvider: FC<IDeviceProviderProps> = ({ children }) => {
  const [microphoneDevicesOptions, setMicrophoneDevicesOptions] = useState<SelectProps['options']>([])
  const [webcamDevicesOptions, setWebcamDevicesOptions] = useState<SelectProps['options']>([])

  const [activeMicrophone, setActiveMicrophone] = useState<string | undefined>()
  const [activeWebcam, setActiveWebcam] = useState<string | undefined>()

  useEffect(() => {
    const getDevices = async () => {
      const mediaDevices = await navigator.mediaDevices?.enumerateDevices()

      const microphoneDevicesOptions: SelectProps['options'] = []
      const webcamDevicesOptions: SelectProps['options'] = []

      mediaDevices?.forEach((device, idx) => {
        const option = {
          value: device.deviceId,
          label: device.label || `Device ${idx + 1}`
        }

        if (device.kind === 'audioinput') {
          microphoneDevicesOptions.push(option)
        } else if (device.kind === 'videoinput') {
          webcamDevicesOptions.push(option)
        }
      })

      setMicrophoneDevicesOptions(microphoneDevicesOptions)
      setWebcamDevicesOptions(webcamDevicesOptions)

      if (microphoneDevicesOptions.length) {
        const defaultMicrophone = localStorage.getItem(DEVICE_MICROPHONE_KEY)
        if (microphoneDevicesOptions.find((device) => {
          return device.value === defaultMicrophone
        })) {
          setActiveMicrophone(defaultMicrophone as string)
        } else {
          setActiveMicrophone(microphoneDevicesOptions[0].value as string)
        }
      }
      if (webcamDevicesOptions.length) {
        const defaultWebcam = localStorage.getItem(DEVICE_WEBCAM_KEY)
        if (webcamDevicesOptions.find((device) => device.value === defaultWebcam)) {
          setActiveWebcam(defaultWebcam as string)
        } else {
          setActiveWebcam(webcamDevicesOptions[0]?.value as string)
        }
      }
    }
    void getDevices()
  }, [])

  const value = {
    microphoneDevicesOptions,
    webcamDevicesOptions,
    activeMicrophone,
    activeWebcam,
    setActiveMicrophone,
    setActiveWebcam
  }

  return (
    <DeviceContext.Provider value={value}>
      {children}
    </DeviceContext.Provider>
  )
}
