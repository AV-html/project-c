import { type FC } from 'react'

import { Form, Input } from 'antd'

import { SubmitButton } from 'ui/submit-button'

import { EMPTY_SYMBOL } from 'core/constants/main'
import { validateEmail } from 'core/utils/validators'

import { type ILoginForm } from './login-types'
import { authApi } from '../../auth-api'
import { iconRender } from '../../auth-utils'

export const LoginComponent: FC = () => {
  const [form] = Form.useForm<ILoginForm>()
  const [login] = authApi.useLazyLoginQuery()

  const handleLogin = (values: ILoginForm): void => {
    void login(values)
  }

  return (
    <Form
      form={form}
      layout={'vertical'}
      onFinish={handleLogin}
    >

      <Form.Item
        label={'E-mail'}
        name={'email'}
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
          size={'large'}
          placeholder={'e-mail'}
        />
      </Form.Item>

      <Form.Item
        label={'Пароль'}
        name={'password'}
        rules={[{
          required: true,
          message: 'Введите пароль'
        }]}
      >
        <Input.Password
          autoComplete="current-password"
          size={'large'}
          placeholder={'Пароль'}
          iconRender={iconRender}
        />
      </Form.Item>

      <Form.Item label={EMPTY_SYMBOL}>
        <SubmitButton
          block
          form={form}
        >
          Войти
        </SubmitButton>
      </Form.Item>

    </Form>
  )
}
