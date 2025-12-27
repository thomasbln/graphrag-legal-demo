// components/results/rag-result-explanation.tsx

'use client'

import { Card } from '@/components/ui/card'

interface RAGResultExplanationProps {
  queryId?: string
  count: number
  limitation?: {
    type: string
    message: string
    canHandle: boolean
  }
}

export function RAGResultExplanation({ queryId, count, limitation }: RAGResultExplanationProps) {
  const hasLimitation = limitation && !limitation.canHandle
  
  let explanation = ''
  if (hasLimitation) {
    if (limitation?.type === 'aggregation') {
      explanation = 'RAG cannot aggregate or count. It only finds similar documents, but no statistics or groupings.'
    } else if (limitation?.type === 'negative_search') {
      explanation = 'RAG cannot search for absence. It only finds documents with similar content, not documents that are missing something.'
    } else if (limitation?.type === 'multi_criteria') {
      explanation = 'RAG cannot guarantee that multiple criteria are met. It finds similar documents, but both conditions might be missing.'
    } else if (limitation?.type === 'traversal') {
      explanation = 'RAG loses context during relationship navigation. It cannot navigate through connections between entities.'
    } else {
      explanation = 'RAG has limitations with this type of query. It only finds similar documents, not precise structures.'
    }
  } else {
    explanation = `${count} similar documents found. However, accuracy cannot be guaranteed, as RAG is based on similarity, not structure.`
  }
  
  return (
    <Card className="mb-4 border-slate-200 dark:border-slate-700 bg-slate-50/30 dark:bg-slate-800/10 min-h-[180px]">
      <div className="flex items-start gap-2">
        <svg className="w-4 h-4 text-slate-600 dark:text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <div className="flex-1">
          <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            What you're seeing:
          </p>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-2">
            {explanation}
          </p>
          <div className="pt-2 border-t border-slate-200 dark:border-slate-700 mt-2">
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              <span className="font-medium text-slate-600 dark:text-slate-300">RAG Limitation:</span> RAG is based on <span className="font-medium text-slate-700 dark:text-slate-300">semantic similarity</span>. It finds similar documents but cannot navigate relationships, aggregate, or process complex logic.
            </p>
          </div>
          {count === 0 && hasLimitation && (
            <p className="text-xs text-red-600 dark:text-red-400 mt-2 font-medium">
              RAG cannot correctly answer this query.
            </p>
          )}
        </div>
      </div>
    </Card>
  )
}

