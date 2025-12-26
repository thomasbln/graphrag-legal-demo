// components/results/query-context-banner.tsx

'use client'

import { getQueryById } from '@/lib/queries/killer-queries'
import { Card } from '@/components/ui/card'

interface QueryContextBannerProps {
  queryId: string
}

export function QueryContextBanner({ queryId }: QueryContextBannerProps) {
  const query = getQueryById(queryId)
  
  if (!query) return null
  
  return (
    <Card className="mb-6 border-2 border-cyan-200 dark:border-cyan-800/50 bg-gradient-to-r from-cyan-50/50 via-white to-cyan-50/50 dark:from-cyan-950/20 dark:via-slate-900/50 dark:to-cyan-950/20">
      <div className="space-y-4">
        {/* Business Scenario - Vereinfacht */}
        <div>
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center flex-shrink-0">
              <span className="text-cyan-600 dark:text-cyan-400 text-lg">💼</span>
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-1">
                {query.businessScenario.persona}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
                {query.businessScenario.role}
              </p>
              
              {/* Einfache Erklärung */}
              <div className="mb-3">
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Was sucht {query.businessScenario.persona}?
                </p>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {query.businessScenario.simpleExplanation}
                </p>
              </div>
              
              {/* RAG Problem - Einfach erklärt */}
              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
                  <span>⚠️</span>
                  <span>Warum normale Suche scheitert:</span>
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {query.businessScenario.simpleProblem}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Divider */}
        <div className="border-t border-cyan-200 dark:border-cyan-800/50"></div>
        
        {/* Business Value */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <div className="text-xs text-slate-600 dark:text-slate-400 mb-1">Time Saved</div>
            <div className="text-sm font-bold text-cyan-700 dark:text-cyan-400">
              {query.businessValue.timeSaved}
            </div>
          </div>
          {query.businessValue.costAvoidance && (
            <div>
              <div className="text-xs text-slate-600 dark:text-slate-400 mb-1">Cost Avoidance</div>
              <div className="text-sm font-bold text-green-700 dark:text-green-400">
                {query.businessValue.costAvoidance}
              </div>
            </div>
          )}
          {query.businessValue.riskMitigation && (
            <div>
              <div className="text-xs text-slate-600 dark:text-slate-400 mb-1">Risk Mitigation</div>
              <div className="text-sm font-bold text-slate-700 dark:text-slate-300">
                {query.businessValue.riskMitigation}
              </div>
            </div>
          )}
        </div>
        
        {/* Expected Results */}
        <div className="pt-2 border-t border-cyan-200 dark:border-cyan-800/50">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Expected Results:</span>
            <span className="text-xs text-slate-600 dark:text-slate-400">{query.expectedResults}</span>
          </div>
        </div>
      </div>
    </Card>
  )
}

