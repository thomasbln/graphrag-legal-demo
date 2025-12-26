// components/ui/button.tsx

'use client'

import { ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className = '', children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
    
    const variants = {
      primary: 'bg-slate-900 text-white hover:bg-slate-800 active:scale-[0.98] focus:ring-slate-500 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200',
      secondary: 'bg-slate-100 text-slate-900 hover:bg-slate-200 active:scale-[0.98] focus:ring-slate-500 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700',
      outline: 'border border-slate-300 text-slate-700 hover:bg-slate-50 active:scale-[0.98] focus:ring-slate-500 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800',
    }
    
    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    }
    
    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

