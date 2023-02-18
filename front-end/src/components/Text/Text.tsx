import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { clsx } from 'clsx'

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  asChild?: boolean
  className?: string
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

export function Text({
  asChild,
  className,
  size = 'md',
  children,
  ...props
}: TextProps) {
  const Component = asChild ? Slot : 'p'

  return (
    <Component
      {...props}
      className={clsx(
        'font-sans text-zinc-100',
        {
          'text-sm': size === 'sm',
          'text-md': size === 'md',
          'text-lg': size === 'lg',
        },
        className,
      )}
    >
      {children}
    </Component>
  )
}
