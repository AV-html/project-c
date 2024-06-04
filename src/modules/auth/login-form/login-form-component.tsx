import {
  Button, Checkbox, Form, Input
} from 'antd'
import { useNavigate } from 'react-router-dom'

import { goToMainRoute } from 'app/app-router/app-router-configs'

import { Icon } from 'ui/icon'
import { Typography } from 'ui/typography'

import { LOCAL_STORAGE_TOKEN_KEY } from 'core/api/rtk-query-constants'
import { useAppDispatch } from 'core/hooks/rtk'
import { userActions } from 'core/user/user-slice'

import type { ILoginForm } from './login-form-types'
import { authApi } from '../auth-api'

import styles from './login-form.module.css'

export const LoginFormComponent = () => {
  const [form] = Form.useForm()

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [login, {
    isLoading,
    isFetching
    // isSuccess,
    // isError,
    // error
  }] = authApi.useLazyLoginQuery()

  const loginProcess = async (data: ILoginForm) => {
    const res = await login(data).unwrap()

    if (res.token) {
      localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, res.token)
      dispatch(userActions.setUserInfo(res.user))

      navigate(goToMainRoute(), { replace: true })
    }
  }

  const handleFormSubmit = (data: ILoginForm) => {
    void loginProcess(data)
  }

  // useEffect(() => {
  //   if (isError) {
  //     setError('root', {
  //       type: 'custom',
  //       message: 'error'
  //     })
  //   }
  // }, [isError, setError])

  // const changeHadler = (event: ChangeEvent<HTMLInputElement>) => {
  //   if (errors[event.target.name as keyof ILoginFormInputs]) {
  //     clearErrors(event.target.name as keyof ILoginFormInputs)
  //   }
  //   if (errors.root?.message) {
  //     clearErrors('root')
  //   }
  // }

  return (
    <div className={styles.loginForm}>
      <Icon name={'logo'}/>
      <Form
        form={form}
        onFinish={handleFormSubmit}
        layout="vertical"
        size="large"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
      >

        <Typography variant={'h4'}>Вход</Typography>
        <Form.Item
          label="Логин"
          name="login"
          rules={[
            {
              required: true,
              message: 'Поле обязательно к заполнению!'
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Пароль"
          name="password"
          rules={[
            {
              required: true,
              message: 'Поле обязательно к заполнению!'
            }
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label=""
          name="isLdap"
          valuePropName={'checked'}
        >
          <Checkbox>Войти с помощью LDAP</Checkbox>
        </Form.Item>

        <Button
          htmlType="submit"
          type="primary"
          disabled={isLoading || isFetching}
          className={styles.button}
        >
          Войти
        </Button>
      </Form>
    </div>
  )
}
