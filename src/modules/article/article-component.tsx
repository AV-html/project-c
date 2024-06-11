import React, { type FC } from 'react'

import { Flex } from 'antd'
import { Navigate, useNavigate, useParams } from 'react-router-dom'

import { goToNewsRoute, goToNotFoundRoute } from 'app/app-router/app-router-configs'

import { dataArticle } from 'ui/configs/news-configs'
import { Container } from 'ui/container'
import { Icon } from 'ui/icon'

import styles from './article.module.css'

export const ArticleComponent: FC = () => {
  const navigate = useNavigate()
  const { articleId } = useParams()

  const currentArticle = dataArticle.find((article) => article.id === Number(articleId))

  if (!currentArticle) {
    return <Navigate to={goToNotFoundRoute()}/>
  }

  const handleBack = () => {
    navigate(goToNewsRoute())
  }

  return (
    <Container>
      <div className={styles.wrapArticle}>
        <Flex justify={'space-between'}>
          <Flex className={styles.wrapHeader}>
            <div>
              <img className={styles.avatarOne}
                src={currentArticle.article.imgUser}/>
            </div>
            <Flex vertical>
              <div className={styles.userName}>
                {currentArticle.article.name}
              </div>
              <div className={styles.userPosition}>
                {currentArticle.article.userPosition}
              </div>
            </Flex>
          </Flex>
          <button
            className={styles.roundButton}
            onClick={handleBack}
          >
            <Icon name={'arrowShortLeft'}/>
          </button>
          <button className={styles.subscribe} disabled={true}>Подписаться</button>
        </Flex>
        <h1>
          {currentArticle.article.title}
        </h1>
        <Flex className={styles.tagWrap}>
          <div
            className={styles.tag}
            style={{ backgroundColor: currentArticle.article.colorTag }}
          >{currentArticle.article.tag}</div>
        </Flex>
        {
          currentArticle.article.showImg
            ? <img className={styles.hrImg}
              src={currentArticle.article.imgContent}
            />
            : ''
        }
        <p className={styles.p}>
          {currentArticle.article.content_1}
        </p>
        <p className={styles.p}>
          {currentArticle.article.content_2}
        </p>
        <p className={styles.p}>
          {currentArticle.article.content_3}
        </p>
        <Flex justify={'space-between'}>
          <Flex className={styles.likeWrap}
            align={'center'}>
            <Icon name={'heart'}
              color={'#1A1A1AB2'}/>
            <div className={styles.likeCounter}>
              {currentArticle.article.like}
            </div>
          </Flex>
          <Flex align={'center'}>
            <Icon name={'eye'}
              color={'#1A1A1AB2'}/>
            <div className={styles.viewCounter}>{currentArticle.article.view}</div>
            <div className={styles.share}>
              <Icon className={styles.shareIcon}
                name={'share'}/>
            </div>
          </Flex>
        </Flex>
        {/* <Flex> */}
        {/*     <div> */}
        {/*         <img className={styles.avatarOne} */}
        {/*             src={avatarOne}/> */}
        {/*     </div> */}
        {/*     <div className={styles.comment}> */}
        {/*         <div className={styles.nameComment}> */}
        {/*         Максим, HR-директор */}
        {/*         </div> */}
        {/*         <p> */}
        {/*         Расскажите, пожалуйста, человеку далёкому от ML почему это не простенький классификатор? Кажется, что задача бьётся на две довольно базовые для ml задачи: определить машину и отнести ее цвет к одному из 13 */}
        {/*         </p> */}
        {/*         <br/> */}
        {/*         <p> */}
        {/*         Или тут дело не в технологиях, а в том что дешевле размечать через людей? */}
        {/*         </p> */}
        {/*     </div> */}
        {/* </Flex> */}
      </div>
    </Container>
  )
}
