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
    <Card className="border-2 border-amber-200 dark:border-amber-800/50 bg-gradient-to-br from-amber-50/50 to-white dark:from-amber-950/20 dark:to-slate-900/50">
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
              RAG kann diese Abfrage nicht korrekt beantworten
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
            <span>💡</span>
            <span>Warum GraphRAG das kann:</span>
          </p>
          <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1.5 ml-6 list-disc">
            <li>GraphRAG versteht <span className="font-medium text-cyan-700 dark:text-cyan-400">Beziehungen</span> zwischen Verträgen und Klauseln</li>
            <li>Kann durch das <span className="font-medium text-cyan-700 dark:text-cyan-400">Netzwerk navigieren</span>: Contract → Clauses → Types</li>
            <li>Findet nicht nur ähnliche Dokumente, sondern <span className="font-medium text-cyan-700 dark:text-cyan-400">präzise Strukturen</span></li>
            <li>Zeigt die <span className="font-medium text-cyan-700 dark:text-cyan-400">tatsächlichen Klauseln</span>, nicht nur Verträge</li>
            <li>Kann <span className="font-medium text-cyan-700 dark:text-cyan-400">aggregieren, negativ suchen</span> und komplexe Logik verarbeiten</li>
          </ul>
        </div>
      </div>
    </Card>
  )
}

