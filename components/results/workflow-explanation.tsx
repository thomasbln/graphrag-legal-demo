// components/results/workflow-explanation.tsx

'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export function WorkflowExplanation() {
  const [showComparison, setShowComparison] = useState(false)
  
  return (
    <Card className="mb-4 border-cyan-200 dark:border-cyan-800/50 bg-gradient-to-r from-cyan-50/50 to-cyan-100/30 dark:from-cyan-950/20 dark:to-cyan-900/20">
      <div className="space-y-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-cyan-600 dark:text-cyan-400 text-lg">⚡</span>
            <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wide">
              Wie GraphRAG funktioniert
            </h3>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowComparison(!showComparison)}
            className="!px-2 !py-1 !text-[10px] !h-auto"
          >
            {showComparison ? '−' : 'vs SQL/RAG'}
          </Button>
        </div>
        
        {/* Kompakter Vergleich - Collapsible */}
        {showComparison && (
          <div className="mb-3 p-2.5 bg-slate-50/50 dark:bg-slate-800/30 rounded border border-slate-200 dark:border-slate-700">
            <div className="grid grid-cols-3 gap-2 text-[10px]">
              {/* Header */}
              <div className="font-bold text-slate-700 dark:text-slate-300">GraphRAG</div>
              <div className="font-bold text-slate-700 dark:text-slate-300">SQL</div>
              <div className="font-bold text-slate-700 dark:text-slate-300">RAG</div>
              
              {/* Relationships */}
              <div className="text-cyan-700 dark:text-cyan-400">✅ Native</div>
              <div className="text-slate-600 dark:text-slate-400">⚠️ JOINs</div>
              <div className="text-red-600 dark:text-red-400">❌ Keine</div>
              
              {/* Aggregation */}
              <div className="text-cyan-700 dark:text-cyan-400">✅ Ja</div>
              <div className="text-slate-600 dark:text-slate-400">✅ Ja</div>
              <div className="text-red-600 dark:text-red-400">❌ Nein</div>
              
              {/* Negative Search */}
              <div className="text-cyan-700 dark:text-cyan-400">✅ WHERE NOT</div>
              <div className="text-slate-600 dark:text-slate-400">⚠️ Komplex</div>
              <div className="text-red-600 dark:text-red-400">❌ Nein</div>
              
              {/* Traversal */}
              <div className="text-cyan-700 dark:text-cyan-400">✅ Natürlich</div>
              <div className="text-slate-600 dark:text-slate-400">⚠️ Recursive CTE</div>
              <div className="text-red-600 dark:text-red-400">❌ Loses Context</div>
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-2 italic">
              GraphRAG kombiniert Graph-Struktur (wie SQL) mit KI-Verständnis (wie RAG)
            </p>
          </div>
        )}
        
        {/* Kurzer Hinweis: Warum nicht SQL/RAG? - Nur wenn Vergleich nicht expanded */}
        {!showComparison && (
          <div className="mb-3 p-2 bg-slate-50/50 dark:bg-slate-800/30 rounded border border-slate-200 dark:border-slate-700">
            <p className="text-[10px] text-slate-600 dark:text-slate-400 leading-relaxed">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Warum Graph statt SQL?</span> SQL braucht JOINs für Beziehungen. 
              GraphRAG navigiert <span className="font-medium text-cyan-700 dark:text-cyan-400">natürlich durch Relationships</span> - wie das menschliche Gehirn assoziiert.
            </p>
          </div>
        )}
        
        <div className="space-y-2 text-xs">
          {/* Step 1: Natural Language */}
          <div className="flex items-start gap-2">
            <div className="w-5 h-5 rounded-full bg-cyan-500 text-white text-[10px] flex items-center justify-center font-bold flex-shrink-0 mt-0.5">
              1
            </div>
            <div className="flex-1">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Ihre Frage</span>
              <span className="text-slate-600 dark:text-slate-400 ml-1">wird in natürlicher Sprache gestellt</span>
            </div>
          </div>
          
          {/* Arrow */}
          <div className="ml-[14px] text-cyan-500 text-lg leading-none">↓</div>
          
          {/* Step 2: LLM generates Cypher */}
          <div className="flex items-start gap-2">
            <div className="w-5 h-5 rounded-full bg-cyan-500 text-white text-[10px] flex items-center justify-center font-bold flex-shrink-0 mt-0.5">
              2
            </div>
            <div className="flex-1">
              <span className="font-semibold text-slate-700 dark:text-slate-300">KI (LLM)</span>
              <span className="text-slate-600 dark:text-slate-400 ml-1">übersetzt Ihre Frage in eine</span>
              <Badge variant="info" className="ml-1 text-[10px] px-1.5 py-0">Cypher Query</Badge>
            </div>
          </div>
          
          {/* Arrow */}
          <div className="ml-[14px] text-cyan-500 text-lg leading-none">↓</div>
          
          {/* Step 3: Graph Traversal */}
          <div className="flex items-start gap-2">
            <div className="w-5 h-5 rounded-full bg-cyan-500 text-white text-[10px] flex items-center justify-center font-bold flex-shrink-0 mt-0.5">
              3
            </div>
            <div className="flex-1">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Neo4j Graph</span>
              <span className="text-slate-600 dark:text-slate-400 ml-1">navigiert durch</span>
              <span className="text-cyan-600 dark:text-cyan-400 font-medium ml-1">Nodes & Relationships</span>
              <span className="text-slate-600 dark:text-slate-400 ml-1">(Contract → Clause → Type)</span>
            </div>
          </div>
          
          {/* Arrow */}
          <div className="ml-[14px] text-cyan-500 text-lg leading-none">↓</div>
          
          {/* Step 4: Structured Results */}
          <div className="flex items-start gap-2">
            <div className="w-5 h-5 rounded-full bg-cyan-500 text-white text-[10px] flex items-center justify-center font-bold flex-shrink-0 mt-0.5">
              4
            </div>
            <div className="flex-1">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Strukturierte Ergebnisse</span>
              <span className="text-slate-600 dark:text-slate-400 ml-1">mit konkreten Contracts & Clauses</span>
            </div>
          </div>
          
          {/* Arrow */}
          <div className="ml-[14px] text-cyan-500 text-lg leading-none">↓</div>
          
          {/* Step 5: LLM Analysis */}
          <div className="flex items-start gap-2">
            <div className="w-5 h-5 rounded-full bg-cyan-500 text-white text-[10px] flex items-center justify-center font-bold flex-shrink-0 mt-0.5">
              5
            </div>
            <div className="flex-1">
              <span className="font-semibold text-slate-700 dark:text-slate-300">KI-Analyse</span>
              <span className="text-slate-600 dark:text-slate-400 ml-1">interpretiert Ergebnisse & liefert Insights</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

