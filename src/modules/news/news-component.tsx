import { useState } from 'react'

import { Flex, Input } from 'antd'
import { useNavigate } from 'react-router-dom'

import { goToAiHrRoute } from 'app/app-router/app-router-configs'

import { dataArticle } from 'ui/configs/news-configs'
import { Container } from 'ui/container/'
import { Icon } from 'ui/icon'

import HRImage from 'core/assets/images/hr-background.svg'

import { PreviewArticle } from './components/preview-article'
import { TwitArticleComponent } from './components/twit-article/twit-article-component'
import { Hackathon } from '../events/components/hackathon'

import styles from './news.module.css'

export const NewsComponent = () => {
  const [filter, setFilter] = useState('all')

  const filterButtonHandler = (filter: string) => {
    setFilter(filter)
  }

  const navigation = useNavigate()
  const onClickChangePage = () => {
    navigation(goToAiHrRoute())
  }

  const articlesList = () => {
    switch (filter) {
      case 'all':
        return (
          <>
            <PreviewArticle
              id={dataArticle[0].id}
              imgUser={dataArticle[0].preview.imgUser}
              name={dataArticle[0].preview.name}
              userPosition={dataArticle[0].preview.userPosition}
              title={dataArticle[0].preview.title}
              content={dataArticle[0].preview.content}
              imgContent={dataArticle[0].preview.imgContent}
              tag={dataArticle[0].preview.tag}
              showImg={dataArticle[0].preview.showImg}
              like={dataArticle[0].preview.like}
              view={dataArticle[0].preview.view}
              colorTag={dataArticle[0].preview.colorTag}
            />
            <PreviewArticle
              id={dataArticle[1].id}
              imgUser={dataArticle[1].preview.imgUser}
              name={dataArticle[1].preview.name}
              userPosition={dataArticle[1].preview.userPosition}
              title={dataArticle[1].preview.title}
              content={dataArticle[1].preview.content}
              imgContent={dataArticle[1].preview.imgContent}
              tag={dataArticle[1].preview.tag}
              like={dataArticle[1].preview.like}
              view={dataArticle[1].preview.view}
              colorTag={dataArticle[1].preview.colorTag}
            />
            <PreviewArticle
              id={dataArticle[2].id}
              imgUser={dataArticle[2].preview.imgUser}
              name={dataArticle[2].preview.name}
              userPosition={dataArticle[2].preview.userPosition}
              title={dataArticle[2].preview.title}
              content={dataArticle[2].preview.content}
              imgContent={dataArticle[2].preview.imgContent}
              tag={dataArticle[2].preview.tag}
              showImg={dataArticle[2].preview.showImg}
              like={dataArticle[2].preview.like}
              view={dataArticle[2].preview.view}
              colorTag={dataArticle[2].preview.colorTag}
            />
            <PreviewArticle
              id={dataArticle[3].id}
              imgUser={dataArticle[3].preview.imgUser}
              name={dataArticle[3].preview.name}
              userPosition={dataArticle[3].preview.userPosition}
              title={dataArticle[3].preview.title}
              content={dataArticle[3].preview.content}
              imgContent={dataArticle[3].preview.imgContent}
              tag={dataArticle[3].preview.tag}
              showImg={dataArticle[3].preview.showImg}
              like={dataArticle[3].preview.like}
              view={dataArticle[3].preview.view}
              colorTag={dataArticle[3].preview.colorTag}
            />
          </>
        )
      case 'front':
        return (
          <>
            <PreviewArticle
              id={dataArticle[0].id}
              imgUser={dataArticle[0].preview.imgUser}
              name={dataArticle[0].preview.name}
              userPosition={dataArticle[0].preview.userPosition}
              title={dataArticle[0].preview.title}
              content={dataArticle[0].preview.content}
              imgContent={dataArticle[0].preview.imgContent}
              tag={dataArticle[0].preview.tag}
              showImg={dataArticle[0].preview.showImg}
              like={dataArticle[0].preview.like}
              view={dataArticle[0].preview.view}
              colorTag={dataArticle[0].preview.colorTag}
            />
          </>
        )
      case 'back':
        return (
          <>
            <PreviewArticle
              id={dataArticle[1].id}
              imgUser={dataArticle[1].preview.imgUser}
              name={dataArticle[1].preview.name}
              userPosition={dataArticle[1].preview.userPosition}
              title={dataArticle[1].preview.title}
              content={dataArticle[1].preview.content}
              imgContent={dataArticle[1].preview.imgContent}
              tag={dataArticle[1].preview.tag}
              showImg={dataArticle[1].preview.showImg}
              like={dataArticle[1].preview.like}
              view={dataArticle[1].preview.view}
              colorTag={dataArticle[1].preview.colorTag}
            />
          </>
        )
      case 'des':
        return (
          <>
            <PreviewArticle
              id={dataArticle[2].id}
              imgUser={dataArticle[2].preview.imgUser}
              name={dataArticle[2].preview.name}
              userPosition={dataArticle[2].preview.userPosition}
              title={dataArticle[2].preview.title}
              content={dataArticle[2].preview.content}
              imgContent={dataArticle[2].preview.imgContent}
              tag={dataArticle[2].preview.tag}
              showImg={dataArticle[2].preview.showImg}
              like={dataArticle[2].preview.like}
              view={dataArticle[2].preview.view}
              colorTag={dataArticle[2].preview.colorTag}
            />
          </>
        )
      case 'ml':
        return (
          <>
            <PreviewArticle
              id={dataArticle[3].id}
              imgUser={dataArticle[3].preview.imgUser}
              name={dataArticle[3].preview.name}
              userPosition={dataArticle[3].preview.userPosition}
              title={dataArticle[3].preview.title}
              content={dataArticle[3].preview.content}
              imgContent={dataArticle[3].preview.imgContent}
              tag={dataArticle[3].preview.tag}
              showImg={dataArticle[3].preview.showImg}
              like={dataArticle[3].preview.like}
              view={dataArticle[3].preview.view}
              colorTag={dataArticle[3].preview.colorTag}
            />
          </>
        )
      default:
        return null
    }
  }

  return (
    <div>
      <Container>
        <Flex gap={40}
          vertical>
          <Input
            className={styles.inputSearch}
            placeholder="Найти все про IT"
            prefix={<Icon name={'search'}/>}
            style={{
              borderRadius: '100px',
              outline: 'none',
              boxShadow: 'none',
              borderColor: '#1A1A1A0D',
              paddingLeft: '28px',
              paddingRight: '28px'
            }}
          />
          <Flex gap={16}>
            <div className={styles.mainArticle}>
              <div className={styles.wrapImage}>
                <HRImage className={styles.laptopDeskImage}/>
              </div>
              <div className={styles.imgText} onClick={onClickChangePage}>
                Как AI HR <br/> помогает<br/>улучшить найм
              </div>
            </div>
            <Flex gap={16}
              vertical>
              <TwitArticleComponent id={4}
                title={dataArticle[4].preview.title}
                tag={dataArticle[4].preview.tag}
                colorTag={dataArticle[4].preview.colorTag}
                data={dataArticle[4].article.data}
              />
              <TwitArticleComponent id={6}
                title={dataArticle[6].preview.title}
                tag={dataArticle[6].preview.tag}
                colorTag={dataArticle[6].preview.colorTag}
                data={dataArticle[6].article.data}
              />
              <TwitArticleComponent id={7}
                title={dataArticle[7].preview.title}
                tag={dataArticle[7].preview.tag}
                colorTag={dataArticle[7].preview.colorTag}
                data={dataArticle[7].article.data}
              />
              <TwitArticleComponent id={5}
                title={dataArticle[5].preview.title}
                tag={dataArticle[5].preview.tag}
                colorTag={dataArticle[5].preview.colorTag}
                data={dataArticle[5].article.data}
              />
            </Flex>
          </Flex>
        </Flex>
        <h2 className={styles.eventTitle}>Ближайшие события</h2>
      </Container>
      <Container>
        <Flex className={styles.eventsCard}>
          <Hackathon/>
        </Flex>
      </Container>
      <Container>
        <h2 className={styles.eventTitle}>Лента новостей</h2>
        <Flex style={{ marginBottom: '40px' }}>
          <button
            className={`${styles.filter} ${filter === 'all' ? styles.active : ''}`}
            onClick={() => {
              filterButtonHandler('all')
            }}
          >
            Все
          </button>
          <button
            className={`${styles.filter} ${filter === 'front' ? styles.active : ''}`}
            onClick={() => {
              filterButtonHandler('front')
            }}
          >
            ‍💻 Фронт
          </button>
          <button
            className={`${styles.filter} ${filter === 'back' ? styles.active : ''}`}
            onClick={() => {
              filterButtonHandler('back')
            }}
          >
            🕵️‍♂️ Бэк
          </button>
          <button
            className={`${styles.filter} ${filter === 'des' ? styles.active : ''}`}
            onClick={() => {
              filterButtonHandler('des')
            }}
          >
            👩‍🎨 Дизайн
          </button>
          <button
            className={`${styles.filter} ${filter === 'ml' ? styles.active : ''}`}
            onClick={() => {
              filterButtonHandler('ml')
            }}
          >
            🥷 ML
          </button>
        </Flex>
        {articlesList()}
      </Container>
    </div>
  )
}
