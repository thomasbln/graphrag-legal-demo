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
    <div className="p-4 bg-gradient-to-r from-slate-50 to-slate-100/50 dark:from-slate-800/30 dark:to-slate-900/20 rounded-xl border border-slate-200 dark:border-slate-700/50">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
          Suchergebnisse
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
              {count === 1 ? 'Dokument gefunden' : 'Dokumente gefunden'}
            </div>
            {hasLimitation && (
              <div className="text-xs text-amber-600 dark:text-amber-400 mt-1 font-medium">
                ⚠️ Aber unvollständig
              </div>
            )}
          </div>
        )}
        
        {/* Limitation Badge */}
        {hasLimitation && (
          <div className="flex-1">
            <Badge variant="warning" className="text-xs font-semibold mb-2">
              Limitiert
            </Badge>
            <div className="mt-2 p-2 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-800/50">
              <p className="text-xs text-amber-700 dark:text-amber-300">
                {stats.limitation?.message}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

