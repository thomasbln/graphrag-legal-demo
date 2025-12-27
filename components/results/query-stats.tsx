// components/results/query-stats.tsx

'use client'

import { Badge } from '@/components/ui/badge'

interface QueryStatsProps {
  stats: {
    executionTime?: number
    contracts?: any[]
    aggregations?: Record<string, any>
    rawResults?: any[]
  }
  cached?: boolean
}

export function QueryStats({ stats, cached }: QueryStatsProps) {
  const contractCount = stats.contracts?.length || 0
  const executionTime = stats.executionTime || 0
  const hasAggregations = stats.aggregations && Object.keys(stats.aggregations).length > 0
  
  // Nur anzeigen wenn es relevante Ergebnisse gibt
  if (contractCount === 0 && !hasAggregations) {
    return null
  }
  
  return (
    <div className="p-4 bg-gradient-to-r from-cyan-50 to-cyan-100/50 dark:from-cyan-950/30 dark:to-cyan-900/20 rounded-xl border border-cyan-200 dark:border-cyan-800/50 min-h-[140px]">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
          Search Results
        </span>
        <div className="flex items-center gap-2">
          {cached && (
            <Badge variant="warning" className="text-xs">
              ⚠️ Using cached data (Neo4j paused)
            </Badge>
          )}
          {executionTime > 1000 && (
            <Badge variant="warning" className="text-xs">
              {(executionTime / 1000).toFixed(1)}s
            </Badge>
          )}
        </div>
      </div>
      
      <div className="flex flex-wrap items-baseline gap-4">
        {/* Contract Count - Klarer */}
        {contractCount > 0 && (
          <div>
            <div className="text-2xl font-bold text-cyan-700 dark:text-cyan-400">
              {contractCount}
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
              {contractCount === 1 ? 'contract found' : 'contracts found'}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-500 mt-1">
              These match your search criteria
            </div>
          </div>
        )}
        
        {/* Aggregation Details */}
        {hasAggregations && (
          <div className="flex-1">
            <Badge variant="success" className="text-xs font-semibold mb-2">
              Summary available
            </Badge>
            <div className="space-y-2 mt-2">
              {/* Check if we have structured aggregation rows */}
              {stats.aggregations?._aggregationRows && Array.isArray(stats.aggregations._aggregationRows) ? (
                // Display structured rows (GROUP BY results)
                stats.aggregations._aggregationRows.map((row: any, idx: number) => {
                  // Find category/type field (prioritize common keys)
                  const categoryKey = Object.keys(row).find(k => 
                    k === 'state' || 
                    k === 'category' || 
                    k === 'type' || 
                    (k.includes('category') || k.includes('type') || (k.includes('name') && !k.includes('count') && !k.includes('id')))
                  )
                  
                  // Find count field (prioritize contract_count)
                  const countKey = Object.keys(row).find(k => 
                    k === 'contract_count' ||
                    k === 'count' ||
                    k.includes('count') || 
                    k.includes('total') || 
                    k.includes('sum')
                  )
                  
                  if (categoryKey && countKey) {
                    const categoryValue = String(row[categoryKey])
                    const countValue = Number(row[countKey])
                    
                    // Format category value (capitalize, handle special cases)
                    let displayCategory = categoryValue
                      .replace(/_/g, ' ')
                      .split(' ')
                      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                      .join(' ')
                    
                    // Determine label for count
                    let countLabel = 'contracts'
                    if (countKey.includes('clause')) {
                      countLabel = countValue === 1 ? 'clause' : 'clauses'
                    } else if (countKey.includes('contract')) {
                      countLabel = countValue === 1 ? 'contract' : 'contracts'
                    }
                    
                    return (
                      <div key={idx} className="flex items-center justify-between gap-3 p-2.5 bg-white/50 dark:bg-slate-800/30 rounded-lg border border-cyan-200/50 dark:border-cyan-800/30 hover:bg-white/70 dark:hover:bg-slate-800/50 transition-colors">
                        <div className="flex items-center gap-2">
                          <span className="text-sm">📍</span>
                          <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                            {displayCategory}
                          </span>
                        </div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-lg font-bold text-cyan-700 dark:text-cyan-400">
                            {countValue.toLocaleString()}
                          </span>
                          <span className="text-xs text-slate-600 dark:text-slate-400">
                            {countLabel}
                          </span>
                        </div>
                      </div>
                    )
                  }
                  
                  // Fallback: smart formatting for common patterns
                  const entries = Object.entries(row).filter(([k]) => !k.startsWith('_') && !k.includes('id') && k !== 'data')
                  if (entries.length === 2) {
                    // Try to find a pattern: category + count
                    const [key1, val1] = entries[0]
                    const [key2, val2] = entries[1]
                    
                    const isCount1 = key1.includes('count') || key1.includes('total')
                    const isCount2 = key2.includes('count') || key2.includes('total')
                    
                    if (isCount1 && !isCount2) {
                      // val2 is category, val1 is count
                      const displayCategory = String(val2).replace(/_/g, ' ')
                        .split(' ')
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                        .join(' ')
                      const countValue = Number(val1)
                      
                      return (
                        <div key={idx} className="flex items-center justify-between gap-3 p-2.5 bg-white/50 dark:bg-slate-800/30 rounded-lg border border-cyan-200/50 dark:border-cyan-800/30">
                          <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                            {displayCategory}
                          </span>
                          <span className="text-lg font-bold text-cyan-700 dark:text-cyan-400">
                            {countValue.toLocaleString()} contracts
                          </span>
                        </div>
                      )
                    } else if (isCount2 && !isCount1) {
                      // val1 is category, val2 is count
                      const displayCategory = String(val1).replace(/_/g, ' ')
                        .split(' ')
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                        .join(' ')
                      const countValue = Number(val2)
                      
                      return (
                        <div key={idx} className="flex items-center justify-between gap-3 p-2.5 bg-white/50 dark:bg-slate-800/30 rounded-lg border border-cyan-200/50 dark:border-cyan-800/30">
                          <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                            {displayCategory}
                          </span>
                          <span className="text-lg font-bold text-cyan-700 dark:text-cyan-400">
                            {countValue.toLocaleString()} contracts
                          </span>
                        </div>
                      )
                    }
                  }
                  
                  // Final fallback: show formatted key-value pairs
                  return (
                    <div key={idx} className="p-2.5 bg-white/50 dark:bg-slate-800/30 rounded-lg border border-cyan-200/50 dark:border-cyan-800/30">
                      <div className="flex flex-wrap gap-2 text-xs">
                        {entries.map(([k, v]) => {
                          const displayKey = k.replace(/_/g, ' ')
                            .split(' ')
                            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                            .join(' ')
                          return (
                            <div key={k} className="flex items-center gap-1">
                              <span className="font-semibold text-slate-700 dark:text-slate-300">{displayKey}:</span>
                              <span className="text-cyan-700 dark:text-cyan-400 font-bold">{String(v)}</span>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )
                })
              ) : (
                // Display flat aggregation object
                <div className="flex flex-wrap gap-2">
                  {Object.entries(stats.aggregations || {})
                    .filter(([key]) => !key.startsWith('_')) // Skip internal fields
                    .map(([key, value]) => {
                      const displayKey = key.replace(/_/g, ' ')
                        .split(' ')
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                        .join(' ')
                      return (
                        <div key={key} className="text-xs">
                          <span className="font-semibold text-slate-700 dark:text-slate-300">{displayKey}:</span>
                          <span className="ml-1 text-cyan-700 dark:text-cyan-400 font-bold">{String(value)}</span>
                        </div>
                      )
                    })}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

