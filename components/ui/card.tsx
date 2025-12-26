// components/ui/card.tsx

'use client'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
}

export function Card({ children, className = '', hover = false }: CardProps) {
  const hoverClass = hover ? 'card-hover' : ''
  
  return (
    <div
      className={`rounded-xl border border-slate-200/50 dark:border-slate-700/50 bg-white/90 dark:bg-slate-800/90 p-4 shadow-sm backdrop-blur-md transition-all duration-300 ${hoverClass} ${className}`}
    >
      {children}
    </div>
  )
}

