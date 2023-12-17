import classnames from 'classnames'
import { twMerge } from 'tailwind-merge'

import Spinner from '../Spinner'
import { buttonStyle } from './theme'

import { ComponentProps, PropsWithChildren, forwardRef, memo } from 'react'
import { recordValuesToString } from '../../util/recordValuesToString'

export type variant = 'filled' | 'outlined' | 'text'
export type size = 'sm' | 'md' | 'lg'

export interface ButtonProps {
  variant?: variant
  size?: size
  fullWidth?: boolean
  loading?: boolean
}

export const Button = memo(
  forwardRef<
    HTMLButtonElement,
    PropsWithChildren<ComponentProps<'button'>> & ButtonProps
  >(
    (
      { variant, size, fullWidth, className, children, loading, ...rest },
      ref
    ) => {
      // 1. init
      const { defaultProps, styles } = buttonStyle
      const { base, variants, sizes } = styles

      // 2. set default props
      variant = variant ?? defaultProps.variant
      size = size ?? defaultProps.size
      fullWidth = fullWidth ?? defaultProps.fullWidth

      // 4. set styles
      const buttonBase = recordValuesToString(base?.initial)
      const buttonVariant = recordValuesToString(variants[variant])
      const buttonSize = recordValuesToString(sizes[size])
      const classes = twMerge(
        classnames(
          buttonBase,
          buttonSize,
          buttonVariant,
          {
            [recordValuesToString(base.fullWidth)]: fullWidth,
          },
          {
            'flex items-center gap-2': loading,
            'gap-3': size === 'lg',
          }
        ),
        className
      )

      const spinnerClass = twMerge(
        classnames({
          'w-4 h-4': true,
          'w-5 h-5': size === 'lg',
        })
      )

      // 5. return
      return (
        <button
          {...rest}
          disabled={rest.disabled ?? loading}
          ref={ref}
          className={classes}
          type={rest.type || 'button'}>
          {loading && <Spinner className={spinnerClass} />}
          {children}
        </button>
      )
    }
  )
)

Button.displayName = 'Button'
