// components/ui/badge.tsx

'use client'

interface BadgeProps {
  variant?: 'success' | 'error' | 'info' | 'warning'
  children: React.ReactNode
  className?: string
}

export function Badge({ variant = 'info', children, className = '' }: BadgeProps) {
  const variants = {
    success: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-700',
    error: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border border-red-300 dark:border-red-700',
    info: 'bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-600',
    warning: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border border-amber-300 dark:border-amber-700',
  }
  
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  )
}

