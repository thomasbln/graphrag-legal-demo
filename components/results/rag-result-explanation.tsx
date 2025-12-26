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
      explanation = 'RAG kann nicht aggregieren oder zählen. Es findet nur ähnliche Dokumente, aber keine Statistiken oder Gruppierungen.'
    } else if (limitation?.type === 'negative_search') {
      explanation = 'RAG kann nicht nach Abwesenheit suchen. Es findet nur Dokumente mit ähnlichem Inhalt, nicht Dokumente, denen etwas fehlt.'
    } else if (limitation?.type === 'multi_criteria') {
      explanation = 'RAG kann nicht garantieren, dass mehrere Kriterien erfüllt sind. Es findet ähnliche Dokumente, aber beide Bedingungen könnten fehlen.'
    } else if (limitation?.type === 'traversal') {
      explanation = 'RAG verliert den Kontext bei Beziehungs-Navigation. Es kann nicht durch Verbindungen zwischen Entitäten navigieren.'
    } else {
      explanation = 'RAG hat Limitationen bei dieser Art von Abfrage. Es findet nur ähnliche Dokumente, keine präzisen Strukturen.'
    }
  } else {
    explanation = `${count} ähnliche Dokumente gefunden. Die Genauigkeit kann jedoch nicht garantiert werden, da RAG auf Ähnlichkeit basiert, nicht auf Struktur.`
  }
  
  return (
    <Card className="mb-4 border-slate-200 dark:border-slate-700 bg-slate-50/30 dark:bg-slate-800/10">
      <div className="flex items-start gap-2">
        <span className="text-amber-600 dark:text-amber-400 text-sm">⚠️</span>
        <div className="flex-1">
          <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Was Sie hier sehen:
          </p>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-2">
            {explanation}
          </p>
          <div className="pt-2 border-t border-slate-200 dark:border-slate-700 mt-2">
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              <span className="font-medium text-slate-600 dark:text-slate-300">RAG-Limitierung:</span> RAG basiert auf <span className="font-medium text-amber-700 dark:text-amber-400">semantischer Ähnlichkeit</span>. Es findet ähnliche Dokumente, kann aber keine Beziehungen navigieren, nicht aggregieren oder komplexe Logik verarbeiten.
            </p>
          </div>
          {count === 0 && hasLimitation && (
            <p className="text-xs text-amber-600 dark:text-amber-400 mt-2 font-medium">
              RAG kann diese Abfrage nicht korrekt beantworten.
            </p>
          )}
        </div>
      </div>
    </Card>
  )
}

