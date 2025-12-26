// components/results/rag-workflow.tsx

'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export function RAGWorkflow() {
  return (
    <Card className="mb-4 border-slate-200 dark:border-slate-700 bg-gradient-to-r from-slate-50/50 to-slate-100/30 dark:from-slate-800/20 dark:to-slate-900/20">
      <div className="space-y-3">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-slate-600 dark:text-slate-400 text-lg">🔍</span>
          <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wide">
            Wie RAG funktioniert
          </h3>
        </div>
        
        <div className="space-y-2 text-xs">
          {/* Step 1: Natural Language */}
          <div className="flex items-start gap-2">
            <div className="w-5 h-5 rounded-full bg-slate-400 text-white text-[10px] flex items-center justify-center font-bold flex-shrink-0 mt-0.5">
              1
            </div>
            <div className="flex-1">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Ihre Frage</span>
              <span className="text-slate-600 dark:text-slate-400 ml-1">wird in natürlicher Sprache gestellt</span>
            </div>
          </div>
          
          {/* Arrow */}
          <div className="ml-[14px] text-slate-400 text-lg leading-none">↓</div>
          
          {/* Step 2: Embedding Generation */}
          <div className="flex items-start gap-2">
            <div className="w-5 h-5 rounded-full bg-slate-400 text-white text-[10px] flex items-center justify-center font-bold flex-shrink-0 mt-0.5">
              2
            </div>
            <div className="flex-1">
              <span className="font-semibold text-slate-700 dark:text-slate-300">KI (LLM)</span>
              <span className="text-slate-600 dark:text-slate-400 ml-1">erstellt ein</span>
              <Badge variant="warning" className="ml-1 text-[10px] px-1.5 py-0">Embedding</Badge>
              <span className="text-slate-600 dark:text-slate-400 ml-1">(Vektor-Repräsentation)</span>
            </div>
          </div>
          
          {/* Arrow */}
          <div className="ml-[14px] text-slate-400 text-lg leading-none">↓</div>
          
          {/* Step 3: Vector Search */}
          <div className="flex items-start gap-2">
            <div className="w-5 h-5 rounded-full bg-slate-400 text-white text-[10px] flex items-center justify-center font-bold flex-shrink-0 mt-0.5">
              3
            </div>
            <div className="flex-1">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Vector Search</span>
              <span className="text-slate-600 dark:text-slate-400 ml-1">findet</span>
              <span className="text-amber-600 dark:text-amber-400 font-medium ml-1">ähnliche Dokumente</span>
              <span className="text-slate-600 dark:text-slate-400 ml-1">durch Ähnlichkeit</span>
            </div>
          </div>
          
          {/* Arrow */}
          <div className="ml-[14px] text-slate-400 text-lg leading-none">↓</div>
          
          {/* Step 4: Results */}
          <div className="flex items-start gap-2">
            <div className="w-5 h-5 rounded-full bg-slate-400 text-white text-[10px] flex items-center justify-center font-bold flex-shrink-0 mt-0.5">
              4
            </div>
            <div className="flex-1">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Ähnliche Dokumente</span>
              <span className="text-slate-600 dark:text-slate-400 ml-1">werden zurückgegeben</span>
            </div>
          </div>
        </div>
        
        {/* Problem Highlight */}
        <div className="mt-3 p-2.5 bg-amber-50 dark:bg-amber-950/20 rounded border border-amber-200 dark:border-amber-800/50">
          <p className="text-[10px] text-amber-700 dark:text-amber-400 leading-relaxed">
            <span className="font-semibold">⚠️ Problem:</span> RAG kann nicht aggregieren, keine Beziehungen navigieren, keine negativen Suchen. Findet nur ähnliche Dokumente, keine präzisen Strukturen.
          </p>
        </div>
      </div>
    </Card>
  )
}

