// components/results/contract-card.tsx

'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { Contract, Clause, ClauseType } from '@/lib/types'

interface ContractCardProps {
  contract: Contract
  matchedClauses?: Array<{
    clause: Clause
    clauseType: ClauseType
  }>
}

export function ContractCard({ contract, matchedClauses }: ContractCardProps) {
  const [expanded, setExpanded] = useState(false)
  
  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation() // WICHTIG: Event stoppen, damit Card onClick nicht ausgelöst wird
    setExpanded(!expanded)
  }
  
  return (
    <Card hover className="cursor-pointer" onClick={() => setExpanded(!expanded)}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-slate-950 dark:text-slate-100 truncate mb-2">
            {contract.title}
          </h4>
          
          {/* Contract Info - Klarer erklärt */}
          <div className="mt-2 flex flex-wrap gap-1.5">
            <Badge variant="info" className="text-xs">
              {contract.num_clauses} Klauseln insgesamt
            </Badge>
            {matchedClauses && matchedClauses.length > 0 && (
              <Badge variant="success" className="text-xs">
                {matchedClauses.length} relevante {matchedClauses.length === 1 ? 'Klausel' : 'Klauseln'} gefunden
              </Badge>
            )}
          </div>
          
          {/* Erklärung warum dieser Contract relevant ist */}
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
            Dieser Vertrag erfüllt Ihre Suchkriterien.
          </p>
        </div>
        <button
          onClick={handleToggle}
          className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors text-lg font-light"
          aria-label={expanded ? 'Collapse' : 'Expand'}
          type="button"
        >
          {expanded ? '−' : '+'}
        </button>
      </div>
      
      {expanded && (
        <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 space-y-4">
          {/* Relevante Clauses anzeigen */}
          {matchedClauses && matchedClauses.length > 0 ? (
            <div>
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Relevante Klauseln:
              </p>
              <div className="space-y-2">
                {matchedClauses.map((item, idx) => (
                  <div key={idx} className="p-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                    <Badge variant="success" className="text-xs mb-1">
                      {item.clauseType.name}
                    </Badge>
                    <p className="text-xs text-slate-700 dark:text-slate-300 mt-1 line-clamp-3 leading-relaxed">
                      {item.clause.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            // Info wenn keine Clauses vorhanden
            <div className="p-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
              <p className="text-xs text-slate-600 dark:text-slate-400">
                ℹ️ Diese Query zeigt keine spezifischen Klauseln (z.B. bei negativen Suchen).
              </p>
            </div>
          )}
          
          {/* Vertragskontext - Immer anzeigen */}
          <div>
            <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Vertragskontext:
            </p>
            <p className="text-xs text-slate-800 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">
              {contract.context || 'Kein Kontext verfügbar'}
            </p>
          </div>
        </div>
      )}
    </Card>
  )
}

