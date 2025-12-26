// components/results/cypher-display.tsx

'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface CypherDisplayProps {
  cypher: string
}

export function CypherDisplay({ cypher }: CypherDisplayProps) {
  const [expanded, setExpanded] = useState(true) // Default: expanded
  const [copied, setCopied] = useState(false)
  
  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(cypher)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  
  return (
    <Card className="border-cyan-200 dark:border-cyan-800/50 bg-cyan-50/30 dark:bg-cyan-950/10">
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-cyan-600 dark:text-cyan-400 text-sm">🔍</span>
              <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wide">
                AI-Generierte Cypher Query
              </h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Die KI hat Ihre Frage in eine strukturierte Graph-Abfrage übersetzt. Diese navigiert durch <span className="font-medium text-cyan-700 dark:text-cyan-400">Nodes (Contracts, Clauses, Types)</span> und deren <span className="font-medium text-cyan-700 dark:text-cyan-400">Relationships</span>.
            </p>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={copyToClipboard}
              aria-label="Copy Cypher query"
              className="!px-3 !py-1.5 !text-xs"
            >
              {copied ? 'Copied!' : 'Copy'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setExpanded(!expanded)}
              aria-label={expanded ? 'Collapse' : 'Expand'}
              className="!px-3 !py-1.5 !text-xs"
            >
              {expanded ? '−' : '+'}
            </Button>
          </div>
        </div>
        
        {expanded && (
          <div className="mt-2 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-cyan-200 dark:border-cyan-800/50">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="info" className="text-[10px] px-1.5 py-0">
                Cypher Query
              </Badge>
              <span className="text-[10px] text-slate-500 dark:text-slate-400">
                Navigiert: {'(Contract)-[:CONTAINS]->(Clause)-[:OF_TYPE]->(ClauseType)'}
              </span>
            </div>
            <pre className="text-xs overflow-x-auto">
              <code className="text-slate-800 dark:text-slate-200 font-mono">{cypher}</code>
            </pre>
          </div>
        )}
      </div>
    </Card>
  )
}

