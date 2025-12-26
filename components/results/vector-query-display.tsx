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
    <Card className="border-slate-200 dark:border-slate-700 bg-slate-50/30 dark:bg-slate-800/10">
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-slate-600 dark:text-slate-400 text-sm">🔍</span>
              <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wide">
                RAG Vector Query
              </h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              RAG verwendet <span className="font-medium text-amber-700 dark:text-amber-400">Vektor-Embeddings</span> zur Ähnlichkeitssuche. 
              Findet Dokumente basierend auf semantischer Ähnlichkeit, aber keine strukturierten Beziehungen.
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
              <Badge variant="warning" className="text-[10px] px-1.5 py-0">
                Embedding Query
              </Badge>
              <span className="text-[10px] text-slate-500 dark:text-slate-400">
                Sucht nach ähnlichen Dokumenten (keine Struktur-Navigation)
              </span>
            </div>
            <div className="p-3 bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-700">
              <p className="text-xs text-slate-700 dark:text-slate-300 font-mono italic">
                "{query}"
              </p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-2">
                → Wird zu Vektor-Embedding konvertiert → Ähnlichkeitssuche in Dokument-Embeddings
              </p>
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}

