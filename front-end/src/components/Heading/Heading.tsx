import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { clsx } from 'clsx'

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  asChild?: boolean
  className?: string
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

export function Heading({
  asChild,
  className,
  size = 'md',
  children,
  ...props
}: HeadingProps) {
  const Component = asChild ? Slot : 'h2'

  return (
    <Component
      {...props}
      className={clsx(
        'font-sans font-bold text-zinc-100',
        {
          'text-lg': size === 'sm',
          'text-xl': size === 'md',
          'text-2xl': size === 'lg',
        },
        className,
      )}
    >
      {children}
    </Component>
  )
}
