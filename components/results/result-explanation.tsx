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
  
  // Erklärung basierend auf Query-Typ
  let explanation = ''
  if (query.category === 'negative_search') {
    explanation = `Diese ${contractCount} Verträge wurden gefunden, weil ihnen wichtige Klauseln FEHLEN.`
  } else if (query.category === 'multi_criteria') {
    explanation = `Diese ${contractCount} Verträge haben BEIDE gesuchten Kriterien erfüllt.`
  } else if (query.category === 'aggregation') {
    explanation = hasAggregations 
      ? 'Die Ergebnisse zeigen eine Zusammenfassung aller Verträge nach Kategorien.'
      : 'Die Abfrage zählt und kategorisiert Verträge.'
  } else if (query.category === 'traversal') {
    explanation = `Diese ${contractCount} Verträge wurden gefunden und alle relevanten Details wurden automatisch zusammengestellt.`
  } else {
    explanation = `Diese ${contractCount} Verträge erfüllen Ihre komplexen Suchkriterien.`
  }
  
  return (
    <Card className="mb-4 border-cyan-200 dark:border-cyan-800/50 bg-cyan-50/30 dark:bg-cyan-950/10">
      <div className="flex items-start gap-2">
        <span className="text-cyan-600 dark:text-cyan-400 text-sm">💡</span>
        <div className="flex-1">
          <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Was Sie hier sehen:
          </p>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-2">
            {explanation}
          </p>
          <div className="pt-2 border-t border-cyan-200 dark:border-cyan-700 mt-2">
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              <span className="font-medium text-slate-600 dark:text-slate-300">Graph-Kontext:</span> Die Ergebnisse zeigen die <span className="font-medium text-cyan-700 dark:text-cyan-400">Beziehungen</span> zwischen Verträgen und Klauseln. GraphRAG navigiert durch diese Struktur, um präzise Antworten zu liefern, nicht nur ähnliche Dokumente zu finden.
            </p>
          </div>
          {contractCount === 0 && !hasAggregations && (
            <p className="text-xs text-amber-600 dark:text-amber-400 mt-2 font-medium">
              Keine Verträge gefunden, die Ihre Kriterien erfüllen.
            </p>
          )}
        </div>
      </div>
    </Card>
  )
}

