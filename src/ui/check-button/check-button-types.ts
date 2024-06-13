import type { DetailedHTMLProps, InputHTMLAttributes, ReactNode } from 'react'

export type TCheckBoxProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
export interface ICheckButtonProps extends TCheckBoxProps {
  children?: ReactNode
}
