// components/comparison/rag-column.tsx

'use client'

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

  const limitation = results?.limitation
  const ragResults = results?.results || []
  const count = results?.count || 0
  const query = results?.query || ''

  return (
    <div className="border-2 border-slate-300/50 dark:border-slate-700/50 rounded-2xl p-6 bg-white dark:bg-slate-900/95 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden group">
      <h2 className="text-lg font-bold text-slate-950 dark:text-slate-100 mb-4 flex items-center gap-3">
        <span className="w-3 h-3 rounded-full bg-slate-400"></span>
        RAG
      </h2>
      
      {results && (
        <div className="relative z-10 space-y-6">
          {/* Stats oben, kompakt - parallel zu GraphRAG */}
          <RAGStats 
            stats={{
              executionTime: results.executionTime,
              count: count,
              limitation: limitation,
            }}
          />
          
          {/* RAG Workflow - parallel zu WorkflowExplanation */}
          <RAGWorkflow />
          
          {/* Vector Query Display - parallel zu CypherDisplay */}
          {query && (
            <VectorQueryDisplay query={query} />
          )}
          
          {/* RAG Results Explanation - parallel zu ResultExplanation */}
          {queryId && (
            <RAGResultExplanation 
              queryId={queryId}
              count={count}
              limitation={limitation}
            />
          )}
          
          {/* RAG Results - parallel zu Contracts/Clauses */}
          {ragResults.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  Gefundene Dokumente ({ragResults.length})
                </h3>
                <Badge variant="warning" className="text-xs">
                  Nur ähnliche Dokumente
                </Badge>
              </div>
              <div className="space-y-2">
                {ragResults.slice(0, 5).map((contract: any, idx: number) => (
                  <ContractCard 
                    key={contract.id || idx} 
                    contract={contract}
                    matchedClauses={[]} // RAG hat keine Clauses
                  />
                ))}
                {limitation && !limitation.canHandle && (
                  <div className="p-3 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-800/50">
                    <p className="text-xs text-amber-700 dark:text-amber-300">
                      ⚠️ Diese Ergebnisse sind unvollständig. RAG kann nicht aggregieren, keine Beziehungen zeigen oder komplexe Abfragen beantworten.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Limitation Card - parallel zu Analysis */}
          {limitation && (
            <LimitationCard limitation={limitation} />
          )}
        </div>
      )}
    </div>
  )
}

