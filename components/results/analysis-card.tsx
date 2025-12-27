// components/results/analysis-card.tsx

'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { Analysis } from '@/lib/types'

interface AnalysisCardProps {
  analysis: Analysis
}

export function AnalysisCard({ analysis }: AnalysisCardProps) {
  const [expanded, setExpanded] = useState(false)
  
  return (
    <Card className="border-2 border-cyan-200 dark:border-cyan-800/50 bg-gradient-to-br from-cyan-50/50 to-white dark:from-cyan-950/20 dark:to-slate-900/50">
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
          <h3 className="text-sm font-bold text-slate-950 dark:text-slate-100">
            What does this mean for you?
          </h3>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs font-medium text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors"
          aria-label={expanded ? 'Collapse' : 'Expand'}
        >
          {expanded ? 'Less' : 'More Details'}
        </button>
      </div>
      
      <p className="text-sm text-slate-900 dark:text-slate-200 mb-4 leading-relaxed font-medium">
        {analysis.summary}
      </p>
      
      {/* Quick Takeaways - Immer sichtbar */}
      {((analysis.insights?.length ?? 0) > 0 || (analysis.riskFlags?.length ?? 0) > 0 || (analysis.recommendations?.length ?? 0) > 0) && (
        <div className="flex gap-2 flex-wrap mb-4 pb-4 border-b border-slate-200 dark:border-slate-700">
          {analysis.insights && analysis.insights.length > 0 && (
            <div className="flex items-center gap-1.5">
              <span className="text-cyan-500">💡</span>
              <span className="text-xs text-slate-600 dark:text-slate-400">
                {analysis.insights.length} {analysis.insights.length === 1 ? 'Insight' : 'Insights'}
              </span>
            </div>
          )}
          {analysis.riskFlags && analysis.riskFlags.length > 0 && (
            <div className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span className="text-xs text-slate-600 dark:text-slate-400">
                {analysis.riskFlags.length} {analysis.riskFlags.length === 1 ? 'Risk' : 'Risks'}
              </span>
            </div>
          )}
          {analysis.recommendations && analysis.recommendations.length > 0 && (
            <div className="flex items-center gap-1.5">
              <span className="text-green-500">✓</span>
              <span className="text-xs text-slate-600 dark:text-slate-400">
                {analysis.recommendations.length} {analysis.recommendations.length === 1 ? 'Recommendation' : 'Recommendations'}
              </span>
            </div>
          )}
        </div>
      )}
      
      {expanded && (
        <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-700">
          {analysis.insights && analysis.insights.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-slate-200 mb-2">
                Key Insights
              </h4>
              <ul className="text-sm text-slate-800 dark:text-slate-300 space-y-2">
                {analysis.insights.map((insight, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-teal-500 mt-0.5">•</span>
                    <span>{insight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {analysis.riskFlags && analysis.riskFlags.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-slate-200 mb-2">
                Risks
              </h4>
              <ul className="text-sm text-slate-800 dark:text-slate-300 space-y-2">
                {analysis.riskFlags.map((flag, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">⚠</span>
                    <span>{flag}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {analysis.recommendations && analysis.recommendations.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-slate-200 mb-2">
                Recommendations
              </h4>
              <ul className="text-sm text-slate-800 dark:text-slate-300 space-y-2">
                {analysis.recommendations.map((rec, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-teal-500 mt-0.5">✓</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </Card>
  )
}

