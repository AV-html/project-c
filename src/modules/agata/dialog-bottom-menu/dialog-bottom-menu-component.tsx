import { type FC } from 'react'

import { Button, Popover } from 'antd'
import { useParams } from 'react-router-dom'

import { Icon } from 'ui/icon'

import { useAppDispatch, useAppSelector } from 'core/hooks/rtk'

import { type IDialogBottomMenuProps } from './dialog-bottom-menu-types'
import { getStatusDialog } from '../agata-interview-selectors'
import { finishInterview, startInterview } from '../agata-interview-thunk'
import { DialogSettings } from '../dialog-settings'

import styles from './dialog-bottom-menu.module.css'

export const DialogBottomMenuComponent: FC<IDialogBottomMenuProps> = ({
  rec,
  handleStopCaptureClick,
  handleEnableWebcam
}) => {
  const { dialogId } = useParams()
  const status = useAppSelector(getStatusDialog)
  const dispatch = useAppDispatch()
  const handleStartInterview = () => {
    if (dialogId) {
      void dispatch(startInterview(dialogId))
    }
  }
  const handleFinishInterview = () => {
    if (dialogId) {
      void dispatch(finishInterview({ dialogId }))
    }
  }

  return (
    <div className={styles.dialogMenu}>
      <Popover
        trigger={['click']}
        content={<DialogSettings/>}
      >
        <Button
          icon={<Icon name={'settings'}/>}
          type={'default'}
          size={'large'}
          shape={'circle'}
        />
      </Popover>
      {
        rec
          ? <Button
            icon={<Icon name={'stop'}/>}
            type={'default'}
            size={'large'}
            shape={'round'}
            className={styles.playBtn}
            onClick={handleStopCaptureClick}
          >
            Остановить запись
          </Button>
          : <Button
            icon={<Icon name={'play'}/>}
            type={'default'}
            size={'large'}
            shape={'round'}
            className={styles.playBtn}
            onClick={handleEnableWebcam}
          >
            Записать ответ
          </Button>
      }
      {
        status === 'NOT_STARTED' && <Button
          type={'primary'}
          size={'large'}
          shape={'round'}
          onClick={handleStartInterview}
        >
              Начать интервью
        </Button>
      }
      {
        status === 'WAITING' && <Button
          type={'primary'}
          size={'large'}
          shape={'round'}
          onClick={handleFinishInterview}
        >
              Завершить интервью
        </Button>
      }
    </div>
  )
}
