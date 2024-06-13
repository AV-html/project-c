import {
  useCallback, useEffect, useRef, useState
} from 'react'

import {
  Button,
  Card, Flex, Modal, Typography
} from 'antd'
import { useParams } from 'react-router-dom'
import Webcam from 'react-webcam'

import { goToAgataInterviewListRoute } from 'app/app-router/app-router-configs'

import { BackButton } from 'ui/back-button'
import { Container } from 'ui/container'
import { Icon } from 'ui/icon'
import { Stopwatch } from 'ui/stopwatch'

import { useAppDispatch, useAppSelector } from 'core/hooks/rtk'
import { useDevice } from 'core/providers/device-provider/device-hook'

import { LAST_MESSAGE, mimeType } from './agata-interview-constants'
import {
  getCurrentNumberQuestion,
  getDialogHistory,
  getDialogInfo,
  getIsBeforeFinishInterview
} from './agata-interview-selectors'
import { getDialogHistoryById, getDialogInfoById, sendVideoAnswer } from './agata-interview-thunk'
import { DialogBottomMenu } from './dialog-bottom-menu'
import { Message } from './message'

import styles from './agata-interview.module.scss'

export const AgataInterviewComponent = () => {
  const { dialogId } = useParams()
  const dispatch = useAppDispatch()

  const {
    activeMicrophone,
    activeWebcam
  } = useDevice()

  useEffect(() => {
    if (dialogId) {
      void dispatch(getDialogInfoById(dialogId))
      void dispatch(getDialogHistoryById(dialogId))
    }
  }, [dialogId])

  const dialogInfo = useAppSelector(getDialogInfo)
  const dialogHistory = useAppSelector(getDialogHistory)
  const currentNumberQuestion = useAppSelector(getCurrentNumberQuestion)
  const isBeforeFinishInterview = useAppSelector(getIsBeforeFinishInterview)

  const webcamRef = useRef<any>(null)
  const mediaRecorderRef = useRef<any>(null)
  const [rec, setRec] = useState(false)
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([])

  const [enable, setEnable] = useState(false)

  const handleStartCaptureClick = useCallback(() => {
    setRec(true)

    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, { mimeType })
    mediaRecorderRef.current.addEventListener('dataavailable', ({ data }: BlobEvent) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data))
      }
    })
    mediaRecorderRef.current.start()
  }, [webcamRef, setRec, mediaRecorderRef])

  const handleStopCaptureClick = useCallback(async () => {
    setRec(false)
    await mediaRecorderRef.current.stop()
  }, [mediaRecorderRef, webcamRef, setRec])

  const handleEnableWebcam = useCallback(() => {
    setEnable(true)
  }, [])

  // const handleDownload = useCallback(() => {
  //   if (recordedChunks.length) {
  //     const blob = new Blob(recordedChunks, { type: mimeType })
  //
  //     const url = URL.createObjectURL(blob)
  //     const a = document.createElement('a')
  //     document.body.appendChild(a)
  //     a.hidden = true
  //     a.href = url
  //     a.download = 'react-webcam-stream-capture.webm'
  //     a.click()
  //     window.URL.revokeObjectURL(url)
  //
  //     setRecordedChunks([])
  //   }
  // }, [recordedChunks])

  const uploadVideo = () => {
    setEnable(false)

    const blob = new Blob(recordedChunks, { type: mimeType })

    const formData = new FormData()
    formData.append('video', blob)

    if (dialogId) {
      void dispatch(sendVideoAnswer({
        dialogId,
        formData,
        questionIndex: currentNumberQuestion as number
      }))
    }
    setRecordedChunks([])
  }

  const handleResetRec = () => {
    setEnable(false)
    setRecordedChunks([])
  }

  const lastQuestions = dialogHistory[dialogHistory.length - 1]?.message ?? ''

  return (
    <Container className={styles.container}>
      <Flex
        vertical
        gap={24}
        style={{ height: '100%' }}
      >

        <Flex gap={24}>
          <BackButton path={goToAgataInterviewListRoute()}/>
          <Flex
            vertical
            gap={8}
          >
            <Flex>
              <Typography.Title
                level={3}
                style={{ padding: '8px 0' }}
              >
                AI Интервью
              </Typography.Title>
            </Flex>
            <Flex>
              <Typography.Text
                strong
                style={{ padding: '3.5px 0' }}
              >
                {dialogInfo?.company.name}
              </Typography.Text>
            </Flex>
          </Flex>
        </Flex>
        <Card className={styles.card}>
          <Flex vertical gap={8} className={styles.bodyMessages}>
            <Message
              author={'agata'}
              message={dialogInfo?.description}
            />
            {
              dialogHistory?.map((history) => {
                return <Message
                  key={history.messageId}
                  totalQuestions={dialogInfo?.questions.total}
                  author={history.author}
                  message={history.message}
                  createdDate={history.createdDate}
                  questionIndex={history.questionIndex}
                  video={history?.video?.link}
                  preview={history?.video?.preview}
                />
              })
            }
            {
              dialogInfo?.status !== 'COMPLETED' && isBeforeFinishInterview && <Message
                author={'agata'}
                message={LAST_MESSAGE}
              />
            }
          </Flex>
          <DialogBottomMenu handleEnableWebcam={handleEnableWebcam}/>

          <Flex
            vertical
            gap={16}
          >
            {
              enable &&
                <Modal
                  maskClosable={false}
                  open={enable}
                  title={<Typography.Title level={4} className={styles.title}>{lastQuestions}</Typography.Title>}
                  onCancel={handleResetRec}
                  width={800}
                  footer={() => (
                    <Flex
                      justify={'space-between'}
                      align={'center'}
                      className={styles.footer}
                    >
                      <Stopwatch isRunning={rec}/>
                      <Flex gap={8}>
                        <Button
                          icon={<Icon name={'play'} size={16}/>}
                          type={'default'}
                          size={'large'}
                          shape={'circle'}
                          onClick={handleStartCaptureClick}
                          disabled={rec}
                          className={styles.btn}
                        />
                        <Button
                          icon={<Icon name={'stop'} size={16}/>}
                          type={'default'}
                          size={'large'}
                          shape={'circle'}
                          onClick={() => {
                            void handleStopCaptureClick()
                          }}
                          disabled={!rec}
                          className={styles.btn}
                        />
                      </Flex>
                      <Button
                        type={'primary'}
                        size={'large'}
                        shape={'round'}
                        className={styles.playBtn}
                        onClick={uploadVideo}
                        disabled={!recordedChunks.length}
                      >
                          Отправить ответ
                      </Button>
                    </Flex>
                  )}
                >
                  <div className={styles.wrapWebcam}>
                    <Webcam
                      mirrored
                      audio={true}
                      muted={true}
                      ref={webcamRef}
                      className={styles.webcam}
                      audioConstraints={{
                        deviceId: activeMicrophone,
                        noiseSuppression: true,
                        echoCancellation: true
                      }}
                      videoConstraints={{
                        deviceId: activeWebcam,
                        height: 420,
                        width: 640

                        // facingMode: "user" // Для мобильной фронталки
                      }}
                      // onUserMedia={handleStartCaptureClick}
                    />
                    {rec && <div className={styles.rec}/>}
                  </div>
                </Modal>
            }
            {/* { */}
            {/*  recordedChunks.length > 0 && <> */}
            {/*    <button onClick={handleDownload}>Download</button> */}
            {/*    <button onClick={uploadVideo}>Upload to server</button> */}
            {/*  </> */}
            {/* } */}
          </Flex>
        </Card>
      </Flex>
    </Container>
  )
}
