// app/page.tsx

'use client'

import { useState } from 'react'
import { QuerySelector } from '@/components/ui/query-selector'
import { SplitScreen } from '@/components/comparison/split-screen'
import { ThemeToggle } from '@/components/theme-toggle'
import { QueryContextBanner } from '@/components/results/query-context-banner'

export default function Home() {
  const [selectedQueryId, setSelectedQueryId] = useState<string>('')
  const [graphragResults, setGraphragResults] = useState<any>(null)
  const [ragResults, setRagResults] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleQuerySelect(queryId: string) {
    if (!queryId) return
    
    setSelectedQueryId(queryId)
    setLoading(true)
    setError(null)
    setGraphragResults(null)
    setRagResults(null)
    
    try {
      // Fetch both APIs in parallel
      const [graphragResponse, ragResponse] = await Promise.all([
        fetch('/api/query', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ queryId }),
        }),
        fetch('/api/rag', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ queryId }),
        }),
      ])
      
      if (!graphragResponse.ok) {
        throw new Error(`GraphRAG API error: ${graphragResponse.statusText}`)
      }
      
      if (!ragResponse.ok) {
        throw new Error(`RAG API error: ${ragResponse.statusText}`)
      }
      
      const graphrag = await graphragResponse.json()
      const rag = await ragResponse.json()
      
      setGraphragResults(graphrag)
      setRagResults(rag)
    } catch (err) {
      console.error('Query error:', err)
      setError(err instanceof Error ? err.message : 'Unknown error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 relative">
      {/* Header */}
      <header className="border-b-2 border-slate-200/50 dark:border-slate-800/50 bg-gradient-to-r from-white via-cyan-50/30 to-white dark:from-slate-900 dark:via-cyan-950/20 dark:to-slate-900 backdrop-blur-xl sticky top-0 z-20 shadow-lg shadow-cyan-500/5">
        <div className="container mx-auto px-6 py-6 flex items-center justify-between max-w-7xl">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-900 via-cyan-600 to-slate-900 dark:from-slate-100 dark:via-cyan-400 dark:to-slate-100 bg-clip-text text-transparent tracking-tight">
              GraphRAG vs RAG
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 font-medium">
              See why structure beats similarity
            </p>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12 max-w-7xl">
        {/* Query Selector */}
        <div className="mb-8">
          <QuerySelector onSelect={handleQuerySelect} isLoading={loading} />
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl">
            <p className="text-sm text-slate-700 dark:text-slate-300">
              Error: {error}
            </p>
          </div>
        )}

        {/* Business Context Banner */}
        {selectedQueryId && (
          <QueryContextBanner queryId={selectedQueryId} />
        )}

        {/* Loading Spinner - Prominent unter Context Banner */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-16 mb-8">
            {/* Large Graph Animation */}
            <div className="relative w-32 h-32 mb-6">
              {/* Nodes with animation */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-cyan-500 animate-pulse shadow-lg shadow-cyan-500/50"></div>
              <div className="absolute bottom-0 left-0 w-6 h-6 rounded-full bg-cyan-400 animate-pulse shadow-lg shadow-cyan-400/50" style={{ animationDelay: '0.2s' }}></div>
              <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-cyan-400 animate-pulse shadow-lg shadow-cyan-400/50" style={{ animationDelay: '0.4s' }}></div>
              
              {/* Animated connections */}
              <svg className="absolute inset-0 w-full h-full" style={{ overflow: 'visible' }}>
                <line x1="50%" y1="0" x2="0" y2="100%" stroke="rgb(6 182 212)" strokeWidth="3" strokeDasharray="6" className="animate-pulse" opacity="0.6" />
                <line x1="50%" y1="0" x2="100%" y2="100%" stroke="rgb(6 182 212)" strokeWidth="3" strokeDasharray="6" className="animate-pulse" opacity="0.6" style={{ animationDelay: '0.2s' }} />
              </svg>
            </div>
            
            {/* Loading Text */}
            <div className="text-center space-y-2">
              <p className="text-lg font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-cyan-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Analyzing query with GraphRAG...</span>
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Generating Cypher query → Navigating graph relationships → Analyzing results
              </p>
            </div>
          </div>
        )}

        {/* Results - Split Screen */}
        {graphragResults && ragResults && !loading && (
          <SplitScreen
            queryId={selectedQueryId}
            graphragResults={graphragResults}
            ragResults={ragResults}
            isLoading={false}
          />
        )}

        {/* Empty State */}
        {!graphragResults && !ragResults && !loading && !selectedQueryId && (
          <div className="text-center py-20">
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              Select a query above to compare GraphRAG vs RAG
            </p>
          </div>
        )}
      </div>
    </main>
  )
}
