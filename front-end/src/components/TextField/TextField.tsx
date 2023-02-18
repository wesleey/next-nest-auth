import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import clsx from 'clsx'

export interface TextFieldRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  children: React.ReactNode
}

function TextFieldRoot({ className, children, ...props }: TextFieldRootProps) {
  return (
    <div
      {...props}
      className={clsx(
        'relative text-zinc-400 focus-within:text-primary-600',
        className,
      )}
    >
      {children}
    </div>
  )
}

TextFieldRoot.displayName = 'TextField.Root'

export interface TextFieldIconProps {
  className?: string
  children: React.ReactNode
}

function TextFieldIcon({ className, children }: TextFieldIconProps) {
  return (
    <Slot
      className={clsx(
        'absolute top-[50%] translate-y-[-50%] text-lg fill-current',
        className,
      )}
    >
      {children}
    </Slot>
  )
}

TextFieldIcon.displayName = 'TextField.Icon'

export interface TextFieldInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
}

const TextFieldInput = React.forwardRef(
  (props: TextFieldInputProps, ref: React.LegacyRef<HTMLInputElement>) => {
    return (
      <input
        {...props}
        ref={ref}
        className={clsx(
          'w-full h-12 px-4 font-sans text-md rounded bg-zinc-800 text-zinc-100 placeholder:text-zinc-400 focus-within:ring-2 ring-primary-600 appearance-none outline-none disabled:cursor-not-allowed disabled:opacity-50',
          props.className,
        )}
      />
    )
  },
)

TextFieldInput.displayName = 'TextField.Input'

export const TextField = {
  Root: TextFieldRoot,
  Icon: TextFieldIcon,
  Input: TextFieldInput,
}
