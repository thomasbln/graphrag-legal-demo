// components/results/rag-workflow.tsx

'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export function RAGWorkflow() {
  const [showComparison, setShowComparison] = useState(false)
  
  return (
    <Card className="mb-4 border-slate-200 dark:border-slate-700 bg-gradient-to-r from-slate-50/50 to-slate-100/30 dark:from-slate-800/20 dark:to-slate-900/20 min-h-[320px]">
      <div className="space-y-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-slate-600 dark:text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wide">
              How RAG Works
            </h3>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowComparison(!showComparison)}
            className="!px-2 !py-1 !text-xs !h-auto"
          >
            {showComparison ? '−' : 'vs SQL/RAG'}
          </Button>
        </div>
        
        {/* Kompakter Vergleich - Collapsible */}
        {showComparison && (
          <div className="mb-3 p-2.5 bg-slate-50/50 dark:bg-slate-800/30 rounded border border-slate-200 dark:border-slate-700">
            <div className="grid grid-cols-3 gap-2 text-xs">
              {/* Header */}
              <div className="font-bold text-slate-700 dark:text-slate-300">RAG</div>
              <div className="font-bold text-slate-700 dark:text-slate-300">SQL</div>
              <div className="font-bold text-slate-700 dark:text-slate-300">GraphRAG</div>
              
              {/* Relationships */}
              <div className="text-red-600 dark:text-red-400">❌ None</div>
              <div className="text-slate-600 dark:text-slate-400">⚠ JOINs</div>
              <div className="text-cyan-700 dark:text-cyan-400">✅ Native</div>
              
              {/* Aggregation */}
              <div className="text-red-600 dark:text-red-400">❌ No</div>
              <div className="text-slate-600 dark:text-slate-400">✅ Ja</div>
              <div className="text-cyan-700 dark:text-cyan-400">✅ Ja</div>
              
              {/* Negative Search */}
              <div className="text-red-600 dark:text-red-400">❌ No</div>
              <div className="text-slate-600 dark:text-slate-400">⚠ Complex</div>
              <div className="text-cyan-700 dark:text-cyan-400">✅ WHERE NOT</div>
              
              {/* Traversal */}
              <div className="text-red-600 dark:text-red-400">❌ Loses Context</div>
              <div className="text-slate-600 dark:text-slate-400">⚠ Recursive CTE</div>
              <div className="text-cyan-700 dark:text-cyan-400">✅ Natural</div>
              
              {/* Precision */}
              <div className="text-slate-600 dark:text-slate-400">⚠ Similarity</div>
              <div className="text-slate-600 dark:text-slate-400">✅ Precise</div>
              <div className="text-cyan-700 dark:text-cyan-400">✅ Precise</div>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 italic">
              RAG finds similar documents but no structures. GraphRAG combines Graph structure (like SQL) with AI understanding (like RAG).
            </p>
          </div>
        )}
        
        {/* Kurzer Hinweis: Warum RAG limitiert - Nur wenn Vergleich nicht expanded */}
        {!showComparison && (
          <div className="mb-3 p-2 bg-slate-50/50 dark:bg-slate-800/30 rounded border border-slate-200 dark:border-slate-700">
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Why RAG is limited:</span> RAG is based on 
              <span className="font-medium text-slate-700 dark:text-slate-300"> semantic similarity</span>, not structure. 
              Finds similar documents but cannot navigate relationships or aggregate.
            </p>
          </div>
        )}
        
        <div className="space-y-2 text-xs">
          {/* Step 1: Natural Language */}
          <div className="flex items-start gap-2">
            <div className="w-5 h-5 rounded-full bg-slate-400 text-white text-xs flex items-center justify-center font-bold flex-shrink-0 mt-0.5">
              1
            </div>
            <div className="flex-1">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Your question</span>
              <span className="text-slate-600 dark:text-slate-400 ml-1">is asked in natural language</span>
            </div>
          </div>
          
          {/* Arrow */}
          <div className="ml-[14px] text-slate-400 text-lg leading-none">↓</div>
          
          {/* Step 2: Embedding Generation */}
          <div className="flex items-start gap-2">
            <div className="w-5 h-5 rounded-full bg-slate-400 text-white text-xs flex items-center justify-center font-bold flex-shrink-0 mt-0.5">
              2
            </div>
            <div className="flex-1">
              <span className="font-semibold text-slate-700 dark:text-slate-300">AI (LLM)</span>
              <span className="text-slate-600 dark:text-slate-400 ml-1">creates an</span>
              <Badge variant="warning" className="ml-1 text-xs px-1.5 py-0">Embedding</Badge>
              <span className="text-slate-600 dark:text-slate-400 ml-1">(vector representation)</span>
            </div>
          </div>
          
          {/* Arrow */}
          <div className="ml-[14px] text-slate-400 text-lg leading-none">↓</div>
          
          {/* Step 3: Vector Search */}
          <div className="flex items-start gap-2">
            <div className="w-5 h-5 rounded-full bg-slate-400 text-white text-xs flex items-center justify-center font-bold flex-shrink-0 mt-0.5">
              3
            </div>
            <div className="flex-1">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Vector Search</span>
              <span className="text-slate-600 dark:text-slate-400 ml-1">finds</span>
              <span className="text-slate-700 dark:text-slate-300 font-medium ml-1">similar documents</span>
              <span className="text-slate-600 dark:text-slate-400 ml-1">by similarity</span>
            </div>
          </div>
          
          {/* Arrow */}
          <div className="ml-[14px] text-slate-400 text-lg leading-none">↓</div>
          
          {/* Step 4: Results */}
          <div className="flex items-start gap-2">
            <div className="w-5 h-5 rounded-full bg-slate-400 text-white text-xs flex items-center justify-center font-bold flex-shrink-0 mt-0.5">
              4
            </div>
            <div className="flex-1">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Similar documents</span>
              <span className="text-slate-600 dark:text-slate-400 ml-1">are returned</span>
            </div>
          </div>
        </div>
        
        {/* Problem Highlight */}
        <div className="mt-3 p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded border border-slate-200 dark:border-slate-700">
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            <span className="font-semibold">⚠ Problem:</span> RAG cannot aggregate, navigate relationships, or perform negative searches. Only finds similar documents, not precise structures.
          </p>
        </div>
      </div>
    </Card>
  )
}

