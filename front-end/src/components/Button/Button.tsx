import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { clsx } from 'clsx'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  className?: string
  children: React.ReactNode
}

export function Button({
  asChild,
  className,
  children,
  ...props
}: ButtonProps) {
  const Component = asChild ? Slot : 'button'

  return (
    <Component
      {...props}
      className={clsx(
        'px-5 py-4 text-md font-semibold rounded outline-none bg-primary-600 hover:bg-primary-500 text-white disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-zinc-600',
        className,
      )}
    >
      {children}
    </Component>
  )
}
