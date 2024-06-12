import { type FC } from 'react'

import {
  Col, Form, Input, Row, Select
} from 'antd'

import { SubmitButton } from 'ui/submit-button'

import { EMPTY_SYMBOL } from 'core/constants/main'
import { validateEmail } from 'core/utils/validators'

import { roleOptions } from './registration-confiig'
import { type IRegForm } from './registration-types'
import { authApi } from '../../auth-api'

export const RegistrationComponent: FC = () => {
  const [form] = Form.useForm<IRegForm>()

  const [registration] = authApi.useRegistrationMutation()

  const comparePassword = async (): Promise<void> => {
    await new Promise((resolve, reject) => {
      const password = form.getFieldValue('password')
      const confirmPassword = form.getFieldValue('confirmPassword')
      if (password && confirmPassword && password !== confirmPassword) {
        reject(new Error('Пароли не совпадают'))
      } else {
        resolve(undefined)
      }
    })
  }

  const handleReg = (values: IRegForm): void => {
    // eslint-disable-next-line unused-imports/no-unused-vars
    const { confirmPassword, ...data } = values
    void registration(data)
  }

  return (
    <Form form={form}
      layout="vertical"
      onFinish={handleReg}>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Form.Item
            label="E-mail"
            name="email"
            rules={[
              {
                required: true,
                message: 'Пожалуйста, введите E-mail'
              },
              { validator: validateEmail }
            ]}
          >
            <Input
              autoComplete="username"
              size="large"
              placeholder="E-mail"
            />
          </Form.Item>

          <Form.Item
            label={'Роль'}
            name={'role'}
            initialValue={'hr'}
            rules={[{
              required: true,
              message: 'Пожалуйста, укажите роль'
            }]}
          >
            <Select options={roleOptions}
              size={'large'}
              placeholder={'Роль'}/>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            label="Пароль"
            name="password"
            rules={[{
              required: true,
              message: 'Введите пароль'
            }]}
          >
            <Input.Password
              autoComplete="new-password"
              size="large"
              placeholder="Пароль"/>
          </Form.Item>

          <Form.Item
            label="Повторите пароль"
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              {
                required: true,
                message: 'Пожалуйста, повторите пароль'
              },
              { validator: comparePassword }
            ]}
          >
            <Input.Password
              autoComplete="new-password"
              size="large"
              placeholder="Пароль"/>
          </Form.Item>

        </Col>
      </Row>
      <Row>
        <Form.Item label={EMPTY_SYMBOL} style={{ width: '100%' }}>
          <SubmitButton
            block
            form={form}
          >
            Зарегистрироваться
          </SubmitButton>
        </Form.Item>
      </Row>
    </Form>
  )
}
