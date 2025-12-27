// components/results/rag-stats.tsx

'use client'

import { Badge } from '@/components/ui/badge'

interface RAGStatsProps {
  stats: {
    executionTime?: number
    count?: number
    limitation?: {
      type: string
      message: string
      canHandle: boolean
    }
  }
}

export function RAGStats({ stats }: RAGStatsProps) {
  const count = stats.count || 0
  const executionTime = stats.executionTime || 0
  const hasLimitation = stats.limitation && !stats.limitation.canHandle
  
  if (count === 0 && !hasLimitation) {
    return null
  }
  
  return (
    <div className="p-4 bg-gradient-to-r from-slate-50 to-slate-100/50 dark:from-slate-800/30 dark:to-slate-900/20 rounded-xl border border-slate-200 dark:border-slate-700/50 min-h-[140px]">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
          Search Results
        </span>
        {executionTime > 1000 && (
          <Badge variant="warning" className="text-xs">
            {(executionTime / 1000).toFixed(1)}s
          </Badge>
        )}
      </div>
      
      <div className="flex flex-wrap items-baseline gap-4">
        {/* Document Count */}
        {count > 0 && (
          <div>
            <div className="text-2xl font-bold text-slate-600 dark:text-slate-400">
              {count}
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
              {count === 1 ? 'document found' : 'documents found'}
            </div>
            {hasLimitation && (
              <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 mt-1 font-medium">
                <svg className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>But incomplete</span>
              </div>
            )}
          </div>
        )}
        
        {/* Limitation Badge */}
        {hasLimitation && (
          <div className="flex-1">
            <Badge variant="warning" className="text-xs font-semibold mb-2">
              Limited
            </Badge>
            <div className="mt-2 p-2 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800/50">
              <p className="text-xs text-red-700 dark:text-red-300">
                {stats.limitation?.message}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

