import { type FC, useEffect, useState } from 'react'

import { Button, Form } from 'antd'

import { type ISubmitButtonProps } from './submit-button-types'

export const SubmitButtonComponent: FC<ISubmitButtonProps> = ({
  form,
  children,
  ...restProps
}) => {
  const [submittable, setSubmittable] = useState(false)

  const values = Form.useWatch([], form)

  useEffect(() => {
    form.validateFields({ validateOnly: true })
      .then(
        () => {
          setSubmittable(true)
        },
        () => {
          setSubmittable(false)
        }
      )
  }, [values])

  return (
    <Button
      {...restProps}
      size={'large'}
      type="primary"
      htmlType="submit"
      disabled={!submittable}
    >
      {children}
    </Button>
  )
}
