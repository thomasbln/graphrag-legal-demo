// components/results/result-explanation.tsx

'use client'

import { getQueryById } from '@/lib/queries/killer-queries'
import { Card } from '@/components/ui/card'

interface ResultExplanationProps {
  queryId: string
  contractCount: number
  hasAggregations: boolean
}

export function ResultExplanation({ queryId, contractCount, hasAggregations }: ResultExplanationProps) {
  const query = getQueryById(queryId)
  
  if (!query) return null
  
  // Explanation based on query type
  let explanation = ''
  if (query.category === 'negative_search') {
    explanation = `These ${contractCount} contracts were found because they are MISSING important clauses.`
  } else if (query.category === 'multi_criteria') {
    explanation = `These ${contractCount} contracts have fulfilled BOTH search criteria.`
  } else if (query.category === 'aggregation') {
    explanation = hasAggregations 
      ? 'Results show a summary of all contracts by categories.'
      : 'The query counts and categorizes contracts.'
  } else if (query.category === 'traversal') {
    explanation = `These ${contractCount} contracts were found and all relevant details were automatically compiled.`
  } else {
    explanation = `These ${contractCount} contracts meet your complex search criteria.`
  }
  
  return (
    <Card className="mb-4 border-cyan-200 dark:border-cyan-800/50 bg-cyan-50/30 dark:bg-cyan-950/10 min-h-[180px]">
      <div className="flex items-start gap-2">
        <svg className="w-4 h-4 text-cyan-600 dark:text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
        <div className="flex-1">
          <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            What you're seeing:
          </p>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-2">
            {explanation}
          </p>
          <div className="pt-2 border-t border-cyan-200 dark:border-cyan-700 mt-2">
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              <span className="font-medium text-slate-600 dark:text-slate-300">Graph Context:</span> Results show the <span className="font-medium text-cyan-700 dark:text-cyan-400">relationships</span> between contracts and clauses. GraphRAG navigates through this structure to deliver precise answers, not just similar documents.
            </p>
          </div>
          {contractCount === 0 && !hasAggregations && (
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 font-medium">
              No contracts found that meet your criteria.
            </p>
          )}
        </div>
      </div>
    </Card>
  )
}

