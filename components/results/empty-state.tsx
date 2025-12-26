// components/results/empty-state.tsx

'use client'

interface EmptyStateProps {
  limitation: {
    type: string
    message: string
    canHandle: boolean
  }
}

export function EmptyState({ limitation }: EmptyStateProps) {
  return (
    <div className="text-center py-12">
      <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/30 dark:to-red-900/20 flex items-center justify-center border-2 border-red-200 dark:border-red-800/50 shadow-lg shadow-red-500/10">
        <svg className="w-8 h-8 text-red-500 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
      <h3 className="text-base font-bold text-red-600 dark:text-red-400 mb-3 uppercase tracking-wide">
        Limitation
      </h3>
      <p className="text-sm text-slate-700 dark:text-slate-300 max-w-md mx-auto leading-relaxed font-medium">
        {limitation.message}
      </p>
    </div>
  )
}

