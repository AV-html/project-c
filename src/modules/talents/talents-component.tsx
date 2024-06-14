import { type FC } from 'react'

import { Input } from 'antd'

import { Container } from 'ui/container'
import { Icon } from 'ui/icon'

import styles from './talents.module.scss'

export const TalentsComponent: FC = (props) => {
  return (
    <>
      <Container>
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
      </Container>

      <div className={styles.line}>

      </div>

      <Container>

      </Container>
    </>
  )
}
