import {
  CSSProperties,
  HTMLAttributes,
  ReactNode,
  forwardRef,
  memo,
} from 'react'

export interface TypographyProps<C extends keyof JSX.IntrinsicElements>
  extends HTMLAttributes<HTMLElement> {
  id?: string
  style?: CSSProperties
  children?: ReactNode
  component?: C
}

interface InternalTypographyProps<C extends keyof JSX.IntrinsicElements>
  extends TypographyProps<C> {}

export const Typography = memo(
  forwardRef<HTMLElement, InternalTypographyProps<keyof JSX.IntrinsicElements>>(
    (props, ref) => {
      const {
        component: Component = 'article',

        children,
        style,
        ...restProps
      } = props

      return (
        // @ts-expect-error: Expression produces a union type that is too complex to represent.
        <Component style={style} ref={ref} {...restProps}>
          {children}
        </Component>
      )
    }
  )
)

Typography.displayName = 'Typography'

export default Typography
