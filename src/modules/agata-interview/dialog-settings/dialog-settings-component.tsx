import { type FC } from 'react'

import { Flex, Select, Typography } from 'antd'

import { useDevice } from 'core/providers/device-provider/device-hook'

import styles from './dialog-settings.module.css'

export const DialogSettingsComponent: FC = () => {
  const {
    microphoneDevicesOptions,
    webcamDevicesOptions,
    activeMicrophone,
    activeWebcam,
    setActiveMicrophone,
    setActiveWebcam
  } = useDevice()

  return (
    <Flex
      vertical
      gap={16}
      className={styles.content}
    >
      <Typography.Title level={4}>
                Звук и камера
      </Typography.Title>
      <Flex
        vertical
        gap={8}
      >
        <Typography.Text>
                    Микрофон
        </Typography.Text>
        <Select
          size={'large'}
          options={microphoneDevicesOptions}
          value={activeMicrophone}
          onChange={setActiveMicrophone}
        />
      </Flex>
      <Flex
        vertical
        gap={8}
      >
        <Typography.Text>
                    Веб-камера
        </Typography.Text>
        <Select
          size={'large'}
          options={webcamDevicesOptions}
          value={activeWebcam}
          onChange={setActiveWebcam}
        />
      </Flex>
    </Flex>
  )
}
