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
    <div className="space-y-6 mt-8 animate-fadeIn">
      {/* GraphRAG Full Width */}
      <GraphRAGColumn queryId={queryId} results={graphragResults} isLoading={isLoading} />
      
      {/* RAG Kompakt darunter */}
      <RAGColumn queryId={queryId} results={ragResults} isLoading={isLoading} />
    </div>
  )
}

