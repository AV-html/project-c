import { type ChangeEvent, type FC, useState } from 'react'

import {
  Button, Input, Modal, notification, Popover
} from 'antd'
import { useParams } from 'react-router-dom'

import { Icon } from 'ui/icon'

import { useAppDispatch, useAppSelector } from 'core/hooks/rtk'

import { type IDialogBottomMenuProps } from './dialog-bottom-menu-types'
import {
  getHasHistory,
  getIsBeforeFinishInterview,
  getStatusDialog
} from '../agata-interview-selectors'
import { finishInterview, startInterview } from '../agata-interview-thunk'
import { DialogSettings } from '../dialog-settings'

import styles from './dialog-bottom-menu.module.css'

export const DialogBottomMenuComponent: FC<IDialogBottomMenuProps> = ({ handleEnableWebcam }) => {
  const { dialogId } = useParams()
  const status = useAppSelector(getStatusDialog)
  const isBeforeFinishInterview = useAppSelector(getIsBeforeFinishInterview)
  const hasHistory = useAppSelector(getHasHistory)
  const dispatch = useAppDispatch()

  const [feedback, setFeedback] = useState('')

  const handleFeedbackChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setFeedback(e.currentTarget.value)
  }

  const handleStartInterview = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      if (dialogId) {
        void dispatch(startInterview(dialogId))
      }
    } catch (error) {
      notification.error({
        message: 'Доступ к камере и микрофону не предоставлен',
        description: 'Предоставьте доступ к камере и микрофону, чтобы начать интревью'
      })
    }
  }

  const handleFinishInterview = () => {
    if (dialogId) {
      if (isBeforeFinishInterview) {
        void dispatch(finishInterview({ dialogId }))
      }
      Modal.confirm({
        width: 450,
        title: 'Вы уверены, что хотите завершить интервью?',
        icon: <span className={styles.warn}><Icon name={'error'} size={24}/></span>,
        content: 'Оставшиеся вопросы будут оценены в 0 баллов',
        cancelText: 'Отмена',
        okText: 'Заверишть',
        onOk: () => {
          void dispatch(finishInterview({ dialogId, feedback }))
        }
      })
    }
  }

  return (
    <div className={styles.dialogMenu}>
      {
        isBeforeFinishInterview && hasHistory && <Input.TextArea
          showCount
          maxLength={500}
          value={feedback}
          onChange={handleFeedbackChange}
          placeholder={'Обратная связь'}
          className={styles.feedback}
          style={{ resize: 'none' }}
          autoSize={{ minRows: 1, maxRows: 5 }}
        />
      }
      <Popover
        trigger={['click']}
        content={<DialogSettings/>}
      >
        {
          !isBeforeFinishInterview && <Button
            icon={<Icon name={'settings'}/>}
            type={'default'}
            size={'large'}
            shape={'round'}
          >
                Звук и камера
          </Button>
        }
      </Popover>
      {
        status === 'WAITING' && !isBeforeFinishInterview && <Button
          icon={<span><Icon name={'play'} size={16}/></span>}
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
