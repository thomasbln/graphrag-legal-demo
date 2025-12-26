// components/comparison/rag-column.tsx

'use client'

import { EmptyState } from '@/components/results/empty-state'
import { ContractCard } from '@/components/results/contract-card'
import { getQueryById } from '@/lib/queries/killer-queries'

interface RAGColumnProps {
  queryId?: string
  results: any
  isLoading?: boolean
}

export function RAGColumn({ queryId, results, isLoading }: RAGColumnProps) {
  if (isLoading) {
    return (
      <div className="border-2 border-slate-300/50 dark:border-slate-700/50 rounded-2xl p-6 bg-white dark:bg-slate-900/95 backdrop-blur-xl shadow-xl">
        <h2 className="text-lg font-bold text-slate-950 dark:text-slate-100 mb-6 flex items-center gap-3">
          <span className="relative w-3 h-3">
            <span className="absolute w-3 h-3 rounded-full bg-slate-400 animate-ping opacity-75"></span>
            <span className="absolute w-3 h-3 rounded-full bg-slate-400"></span>
          </span>
          RAG
        </h2>
        
        {/* Loading Animation */}
        <div className="flex items-center justify-center py-12 mb-4">
          <div className="relative">
            <svg className="animate-spin h-12 w-12 text-slate-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        </div>
        
        <p className="text-center text-sm text-slate-600 dark:text-slate-400 mb-6">
          Searching documents...
        </p>
        
        <div className="space-y-4">
          <div className="h-20 bg-slate-100 dark:bg-slate-800 rounded-lg animate-pulse" />
        </div>
      </div>
    )
  }

  if (!results) {
    return (
      <div className="border-2 border-slate-300/50 dark:border-slate-700/50 rounded-2xl p-6 bg-white dark:bg-slate-900/95 backdrop-blur-xl shadow-xl">
        <h2 className="text-lg font-bold text-slate-950 dark:text-slate-100 mb-6 flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-slate-400"></span>
          RAG
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm">
          Select a query to see RAG limitations
        </p>
      </div>
    )
  }

  const limitation = results.limitation
  const killerQuery = queryId ? getQueryById(queryId) : undefined

  return (
      <div className="border-2 border-slate-300/50 dark:border-slate-700/50 rounded-2xl p-6 bg-white dark:bg-slate-900/95 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden group">
      <h2 className="text-lg font-bold text-slate-950 dark:text-slate-100 mb-6 flex items-center gap-3">
        <span className="w-3 h-3 rounded-full bg-slate-400"></span>
        RAG
      </h2>
      
      {limitation && limitation.canHandle === false ? (
        <div>
          <EmptyState limitation={limitation} />
          
          {/* NEU: Warum GraphRAG besser ist */}
          <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
            <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
              <span>💡</span>
              <span>Warum GraphRAG das kann:</span>
            </p>
            <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1.5 ml-6 list-disc">
              <li>GraphRAG versteht Beziehungen zwischen Verträgen und Klauseln</li>
              <li>Kann durch das Netzwerk navigieren: Contract → Clauses → Types</li>
              <li>Findet nicht nur ähnliche Dokumente, sondern präzise Strukturen</li>
              <li>Zeigt die tatsächlichen Klauseln, nicht nur Verträge</li>
            </ul>
          </div>
        </div>
      ) : results.results && results.results.length > 0 ? (
        <div>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
            {limitation?.message || 'Ähnliche Dokumente gefunden, aber Genauigkeit kann nicht garantiert werden.'}
          </p>
          <div className="space-y-2">
            {results.results.slice(0, 3).map((contract: any, idx: number) => (
              <ContractCard key={contract.id || idx} contract={contract} />
            ))}
          </div>
        </div>
      ) : (
        <EmptyState limitation={limitation || { type: 'unknown', message: 'Keine Ergebnisse gefunden', canHandle: false }} />
      )}
    </div>
  )
}

