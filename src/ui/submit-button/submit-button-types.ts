import { type FormInstance } from 'antd'
import { type BaseButtonProps } from 'antd/es/button/button'

export interface ISubmitButtonProps extends BaseButtonProps {
  form: FormInstance
}
