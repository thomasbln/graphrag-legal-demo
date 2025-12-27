// components/results/limitation-card.tsx

'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface LimitationCardProps {
  limitation: {
    type: string
    message: string
    canHandle: boolean
  }
}

export function LimitationCard({ limitation }: LimitationCardProps) {
  if (limitation.canHandle) {
    return null // Don't show if RAG can handle it
  }
  
  return (
    <Card className="border-2 border-red-200 dark:border-red-800/50 bg-gradient-to-br from-red-50/50 to-white dark:from-red-950/20 dark:to-slate-900/50">
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/30 dark:to-red-900/20 flex items-center justify-center border-2 border-red-200 dark:border-red-800/50 shadow-lg shadow-red-500/10">
            <svg className="w-6 h-6 text-red-500 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-bold text-red-600 dark:text-red-400 uppercase tracking-wide">
              Limitation
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              RAG cannot correctly answer this query
            </p>
          </div>
        </div>
        
        <div className="p-3 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800/50">
          <p className="text-sm text-red-700 dark:text-red-300 font-medium leading-relaxed">
            {limitation.message}
          </p>
        </div>
        
        {/* Warum GraphRAG das kann */}
        <div className="pt-3 border-t border-slate-200 dark:border-slate-700">
          <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
            <svg className="w-4 h-4 text-slate-600 dark:text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <span>Why GraphRAG can do this:</span>
          </p>
          <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1.5 ml-6 list-disc">
            <li>GraphRAG understands <span className="font-medium text-cyan-700 dark:text-cyan-400">relationships</span> between contracts and clauses</li>
            <li>Can navigate through the <span className="font-medium text-cyan-700 dark:text-cyan-400">network</span>: Contract → Clauses → Types</li>
            <li>Finds not just similar documents, but <span className="font-medium text-cyan-700 dark:text-cyan-400">precise structures</span></li>
            <li>Shows the <span className="font-medium text-cyan-700 dark:text-cyan-400">actual clauses</span>, not just contracts</li>
            <li>Can <span className="font-medium text-cyan-700 dark:text-cyan-400">aggregate, search negatively</span>, and process complex logic</li>
          </ul>
        </div>
      </div>
    </Card>
  )
}

