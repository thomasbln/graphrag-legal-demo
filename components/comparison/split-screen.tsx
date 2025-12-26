// components/comparison/split-screen.tsx

'use client'

import { GraphRAGColumn } from './graphrag-column'
import { RAGColumn } from './rag-column'

interface SplitScreenProps {
  queryId: string
  graphragResults: any
  ragResults: any
  isLoading?: boolean
}

export function SplitScreen({ queryId, graphragResults, ragResults, isLoading }: SplitScreenProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8 animate-fadeIn">
      <GraphRAGColumn queryId={queryId} results={graphragResults} isLoading={isLoading} />
      <RAGColumn queryId={queryId} results={ragResults} isLoading={isLoading} />
    </div>
  )
}

