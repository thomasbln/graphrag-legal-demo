// components/ui/query-selector.tsx

'use client'

import { KILLER_QUERIES } from '@/lib/queries/killer-queries'

interface QuerySelectorProps {
  onSelect: (queryId: string) => void
  isLoading?: boolean
}

export function QuerySelector({ onSelect, isLoading = false }: QuerySelectorProps) {
  return (
    <div className="w-full">
      <label htmlFor="query-select" className="block text-xs font-medium mb-3 text-slate-700 dark:text-slate-300 uppercase tracking-wide">
        Choose a query to compare
      </label>
      <select
        id="query-select"
        onChange={(e) => {
          if (e.target.value && !isLoading) {
            onSelect(e.target.value)
          }
        }}
        disabled={isLoading}
        className="w-full p-5 border-2 border-slate-300 dark:border-slate-700 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-4 focus:ring-cyan-500/30 focus:border-cyan-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-base font-semibold shadow-lg hover:shadow-xl hover:border-cyan-400/50 dark:hover:border-cyan-500/50"
        defaultValue=""
        aria-label="Select a query to compare GraphRAG vs RAG"
      >
        <option value="">Select a query...</option>
        {KILLER_QUERIES.map((q) => (
          <option key={q.id} value={q.id}>
            {q.query}
          </option>
        ))}
      </select>
      {isLoading && (
        <div className="mt-3 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <svg className="animate-spin h-4 w-4 text-cyan-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Loading results...</span>
        </div>
      )}
    </div>
  )
}

