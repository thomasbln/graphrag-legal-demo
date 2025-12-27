// components/results/vector-query-display.tsx

'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface VectorQueryDisplayProps {
  query: string
}

export function VectorQueryDisplay({ query }: VectorQueryDisplayProps) {
  const [expanded, setExpanded] = useState(true)
  
  return (
    <Card className="border-slate-200 dark:border-slate-700 bg-slate-50/30 dark:bg-slate-800/10 min-h-[280px]">
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <svg className="w-4 h-4 text-slate-600 dark:text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wide">
                RAG Vector Query
              </h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              RAG uses <span className="font-medium text-slate-700 dark:text-slate-300">vector embeddings</span> for similarity search. 
              Finds documents based on semantic similarity but no structured relationships.
            </p>
          </div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors text-lg font-light flex-shrink-0"
            aria-label={expanded ? 'Collapse' : 'Expand'}
          >
            {expanded ? '−' : '+'}
          </button>
        </div>
        
        {expanded && (
          <div className="mt-2 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="warning" className="text-xs px-1.5 py-0">
                Embedding Query
              </Badge>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Searches for similar documents (no structure navigation)
              </span>
            </div>
            <div className="p-3 bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-700">
              <p className="text-xs text-slate-700 dark:text-slate-300 font-mono italic">
                "{query}"
              </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                → Converted to vector embedding → Similarity search in document embeddings
              </p>
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}

