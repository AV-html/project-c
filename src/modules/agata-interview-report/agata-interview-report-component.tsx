import { type FC } from 'react'

import { Flex, Typography } from 'antd'
import { useParams } from 'react-router-dom'

import { goToAgataInterviewListRoute } from 'app/app-router/app-router-configs'

import { LazyVideo } from 'components/lazy-video'

import { BackButton } from 'ui/back-button'

import { agataInterviewReportApi } from './agata-interview-report-api'

import styles from './agata-interview-report.module.scss'

export const gradeToColor = {
  top: '#71CB3E',
  middle: '#FB814D',
  bottom: '#FF5574'
}

export const AgataInterviewReportComponent: FC = () => {
  const { dialogId = 'null' } = useParams()

  const { data: reportData } = agataInterviewReportApi.useGetReportByIdQuery(dialogId)

  const totalCount = reportData?.answersCount ?? 0
  const sumGrade = reportData?.questions.reduce((curr, question) => {
    return curr + question.grade
  }, 0) ?? 0

  let color = gradeToColor.bottom
  const total = Number((sumGrade / (totalCount * 10) * 100).toFixed(0))
  if (total > 30 && total < 60) {
    color = gradeToColor.middle
  } else if (total > 30) {
    color = gradeToColor.top
  }

  const list = reportData?.questions.map((question, idx) => {
    let textGrade = '% ошибка'
    let color = gradeToColor.bottom

    const grade = question.grade / 10 * 100
    if (grade > 30 && grade < 60) {
      textGrade = '% средне'
      color = gradeToColor.middle
    } else if (grade > 30) {
      textGrade = '% правильно'
      color = gradeToColor.top
    }

    return <Flex gap={16} className={styles.card} key={question.questionId}>
      <div className={styles.wrapVideo}>
        <LazyVideo
          url={question.video}
          width={'100%'}
          height={'100%'}
          preview={question.preview}
        />
      </div>
      <div className={styles.body}>
        <Typography.Title level={4} className={styles.mb}>
          {`${idx + 1}. ${question.question}`}
        </Typography.Title>
        <Flex justify={'space-between'} align={'center'} className={styles.mb}>
          <Typography.Text type={'secondary'}>
            Оценка AI
          </Typography.Text>
          <div className={styles.tag} style={{ background: color }}>
            {grade} {textGrade}
          </div>
        </Flex>
        <div className={styles.bodyCard}>
          <Flex vertical gap={8} className={styles.scroll}>
            <Typography.Text type={'secondary'}>
              Наш ответ:
            </Typography.Text>
            <Typography.Text className={styles.scroll}>
              {question.answer}
            </Typography.Text>
          </Flex>
        </div>
      </div>
    </Flex>
  })

  return (
    <div className={styles.report}>
      <BackButton path={goToAgataInterviewListRoute()} className={styles.backBtn}/>
      <Flex vertical gap={16}>
        <Flex justify={'space-between'} align={'center'}>
          <Typography.Title level={2}>
            Отчёт интервью (Всего вопросов: {totalCount})
          </Typography.Title>
          {
            total && <Typography.Title level={4} style={{ background: color }} className={styles.tag}>
            Результат {total}%
            </Typography.Title>
          }
        </Flex>
        {list}
      </Flex>
    </div>
  )
}
