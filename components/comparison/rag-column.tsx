// components/comparison/rag-column.tsx

'use client'

import { useState } from 'react'
import { ContractCard } from '@/components/results/contract-card'
import { RAGStats } from '@/components/results/rag-stats'
import { RAGWorkflow } from '@/components/results/rag-workflow'
import { VectorQueryDisplay } from '@/components/results/vector-query-display'
import { RAGResultExplanation } from '@/components/results/rag-result-explanation'
import { LimitationCard } from '@/components/results/limitation-card'
import { Badge } from '@/components/ui/badge'

interface RAGColumnProps {
  queryId?: string
  results: any
  isLoading?: boolean
}

export function RAGColumn({ queryId, results, isLoading }: RAGColumnProps) {
  const [expanded, setExpanded] = useState(false) // Default: collapsed

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
    return null // RAG nicht anzeigen wenn keine Results
  }

  const limitation = results?.limitation
  const ragResults = results?.results || []
  const count = results?.count || 0

  return (
    <div className="border-2 border-slate-300/50 dark:border-slate-700/50 rounded-2xl overflow-hidden">
      {/* Collapsible Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-4 bg-slate-100 dark:bg-slate-800/50 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors flex items-center justify-between group"
      >
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-slate-400"></span>
          <span className="text-lg font-bold text-slate-950 dark:text-slate-100">
            RAG Limitation
          </span>
          {limitation && !limitation.canHandle && (
            <Badge variant="warning" className="text-xs">
              Cannot answer this query
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {expanded ? 'Show less' : 'Show details'}
          </span>
          <span className="text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors text-lg font-light">
            {expanded ? '−' : '+'}
          </span>
        </div>
      </button>
      
      {/* Collapsible Content */}
      {expanded && (
        <div className="p-6 bg-white dark:bg-slate-900/95 space-y-6">
          {/* RAG Workflow - Wie RAG funktioniert */}
          <RAGWorkflow />
          
          {/* Limitation Card prominent */}
          {limitation && (
            <LimitationCard limitation={limitation} />
          )}
          
          {/* RAG Stats kompakt */}
          {count > 0 && (
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
              <p className="text-xs text-slate-600 dark:text-slate-400">
                <span className="font-semibold">{count}</span> similar documents found, but incomplete.
              </p>
            </div>
          )}
        </div>
      )}
      
      {/* Compact View (when collapsed) */}
      {!expanded && limitation && (
        <div className="p-4 bg-white dark:bg-slate-900/95 border-t border-slate-200 dark:border-slate-700">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-950/30 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-red-500 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-red-600 dark:text-red-400 mb-1">
                {limitation.message}
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                GraphRAG can answer this query, RAG cannot.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

