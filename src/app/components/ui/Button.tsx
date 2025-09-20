'use client'

import { ButtonHTMLAttributes } from 'react'
import clsx from 'clsx'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: 'solid' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

export default function Button({
  children,
  variant = 'solid',
  size = 'md',
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles =
    'rounded-lg font-medium transition focus:outline-none focus:ring-2 focus:ring-indigo-500'

  const variantStyles = {
    solid: 'bg-indigo-600 hover:bg-indigo-700 text-white',
    ghost: 'bg-transparent border border-gray-600 text-gray-200 hover:bg-gray-800'
  }

  const sizeStyles = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-5 py-3 text-lg'
  }

  return (
    <button
      className={clsx(baseStyles, variantStyles[variant], sizeStyles[size], className)}
      {...props}
    >
      {children}
    </button>
  )
}
