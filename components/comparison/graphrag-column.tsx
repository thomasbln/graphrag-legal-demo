// components/comparison/graphrag-column.tsx

"use client";

import { QueryStats } from "@/components/results/query-stats";
import { ContractCard } from "@/components/results/contract-card";
import { AnalysisCard } from "@/components/results/analysis-card";
import { CypherDisplay } from "@/components/results/cypher-display";
import { ResultExplanation } from "@/components/results/result-explanation";
import { WorkflowExplanation } from "@/components/results/workflow-explanation";
import { Badge } from "@/components/ui/badge";

interface GraphRAGColumnProps {
  queryId?: string;
  results: any;
  isLoading?: boolean;
}

export function GraphRAGColumn({
  queryId,
  results,
  isLoading,
}: GraphRAGColumnProps) {
  if (isLoading) {
    return (
      <div className="border-2 border-cyan-400/50 dark:border-cyan-500/50 rounded-2xl p-6 bg-white dark:bg-slate-900/95 backdrop-blur-xl shadow-xl">
        <h2 className="text-lg font-bold text-slate-950 dark:text-slate-100 mb-6 flex items-center gap-3">
          <span className="relative w-3 h-3">
            <span className="absolute w-3 h-3 rounded-full bg-cyan-500 animate-ping opacity-75"></span>
            <span className="absolute w-3 h-3 rounded-full bg-cyan-500"></span>
          </span>
          <span className="bg-gradient-to-r from-cyan-600 to-cyan-400 dark:from-cyan-400 dark:to-cyan-300 bg-clip-text text-transparent">
            GraphRAG
          </span>
        </h2>

        {/* Graph Animation */}
        <div className="flex items-center justify-center py-12 mb-4">
          <div className="relative w-24 h-24">
            {/* Nodes */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-cyan-500 animate-pulse"></div>
            <div
              className="absolute bottom-0 left-0 w-4 h-4 rounded-full bg-cyan-400 animate-pulse"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <div
              className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-cyan-400 animate-pulse"
              style={{ animationDelay: "0.4s" }}
            ></div>

            {/* Connections (animated lines) */}
            <svg
              className="absolute inset-0 w-full h-full"
              style={{ overflow: "visible" }}
            >
              <line
                x1="50%"
                y1="0"
                x2="0"
                y2="100%"
                stroke="rgb(6 182 212)"
                strokeWidth="2"
                strokeDasharray="4"
                className="animate-pulse"
                opacity="0.5"
              />
              <line
                x1="50%"
                y1="0"
                x2="100%"
                y2="100%"
                stroke="rgb(6 182 212)"
                strokeWidth="2"
                strokeDasharray="4"
                className="animate-pulse"
                opacity="0.5"
                style={{ animationDelay: "0.2s" }}
              />
            </svg>
          </div>
        </div>

        <p className="text-center text-sm text-slate-600 dark:text-slate-400 mb-6">
          <span className="inline-flex items-center gap-2">
            <span className="animate-spin">⚡</span>
            <span>Navigating graph relationships...</span>
          </span>
        </p>

        <div className="space-y-4">
          <div className="h-20 bg-gradient-to-r from-cyan-50 to-cyan-100/50 dark:from-cyan-950/20 dark:to-cyan-900/20 rounded-lg animate-pulse" />
          <div className="h-32 bg-gradient-to-r from-slate-100 to-slate-200/50 dark:from-slate-800 dark:to-slate-700/50 rounded-lg animate-pulse" />
        </div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="border-2 border-cyan-400/50 dark:border-cyan-500/50 rounded-2xl p-6 bg-white dark:bg-slate-900/95 backdrop-blur-xl shadow-xl">
        <h2 className="text-lg font-bold text-slate-950 dark:text-slate-100 mb-6 flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-cyan-500"></span>
          <span className="bg-gradient-to-r from-cyan-600 to-cyan-400 dark:from-cyan-400 dark:to-cyan-300 bg-clip-text text-transparent">
            GraphRAG
          </span>
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm">
          Select a query to see GraphRAG results
        </p>
      </div>
    );
  }

  return (
    <div className="border-2 border-cyan-400/50 dark:border-cyan-500/50 rounded-2xl p-6 bg-white dark:bg-slate-900/95 backdrop-blur-xl shadow-xl hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300 relative overflow-hidden group">
      {/* Gradient Border Effect - nur im Light Mode */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/20 via-cyan-500/20 to-cyan-400/20 opacity-0 group-hover:opacity-100 dark:opacity-0 transition-opacity duration-300 pointer-events-none blur-xl"></div>

      {/* Wow Effect: Subtle glow - nur im Dark Mode beim Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/10 via-transparent to-cyan-950/10 opacity-0 group-hover:opacity-100 dark:group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

      <div className="relative z-10 space-y-6 flex flex-col">
        <h2 className="text-lg font-bold text-slate-950 dark:text-slate-100 mb-4 flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-cyan-500 status-dot-active"></span>
          <span className="bg-gradient-to-r from-cyan-600 to-cyan-400 dark:from-cyan-400 dark:to-cyan-300 bg-clip-text text-transparent">
            GraphRAG
          </span>
        </h2>

        {results?.result && (
          <>
            {/* Stats oben, kompakt */}
            <div>
              <QueryStats stats={results.result} />
            </div>

            {/* How GraphRAG Works - NEU */}
            <div className="flex flex-col">
              <WorkflowExplanation />
            </div>

            {/* Cypher Query - Prominent nach Stats */}
            {results.result?.cypher && (
              <div className="flex flex-col">
                <CypherDisplay cypher={results.result.cypher} />
              </div>
            )}

            {/* Ergebnis-Erklärung */}
            {queryId && (
              <div className="flex flex-col">
                <ResultExplanation
                  queryId={queryId}
                  contractCount={results.result.contracts?.length || 0}
                  hasAggregations={
                    !!(
                      results.result.aggregations &&
                      Object.keys(results.result.aggregations).length > 0
                    )
                  }
                />
              </div>
            )}

            {/* Clauses Section - Zeigt Relationships prominent (nur wenn vorhanden) */}
            {results.result.clauses && results.result.clauses.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    Found Clauses ({results.result.clauses.length})
                  </h3>
                  <Badge variant="success" className="text-xs">
                    GraphRAG shows relationships
                  </Badge>
                </div>
                <div className="space-y-2">
                  {results.result.clauses
                    .slice(0, 8)
                    .map((item: any, idx: number) => (
                      <div
                        key={idx}
                        className="p-3 bg-cyan-50 dark:bg-cyan-950/20 rounded-lg border border-cyan-200 dark:border-cyan-800/50"
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <Badge variant="success" className="text-xs">
                            {item.clauseType.name}
                          </Badge>
                          <span className="text-xs text-slate-500 dark:text-slate-400 truncate flex-1 text-right">
                            from: {item.contract.title}
                          </span>
                        </div>
                        <p className="text-xs text-slate-700 dark:text-slate-300 line-clamp-3 leading-relaxed">
                          {item.clause.text}
                        </p>
                      </div>
                    ))}
                  {results.result.clauses.length > 8 && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 text-center pt-2">
                      ... and {results.result.clauses.length - 8} more clauses
                      in contract details
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Contracts Section - Gruppiert mit ihren Clauses */}
            {results.result.contracts &&
              results.result.contracts.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                      Found Contracts ({results.result.contracts.length})
                    </h3>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      {results.result.contracts.length} found
                    </span>
                  </div>
                  <div className="space-y-2">
                    {results.result.contracts
                      .slice(0, 5)
                      .map((contract: any) => {
                        // Finde Clauses für diesen Contract
                        const contractClauses =
                          results.result.clauses?.filter(
                            (c: any) =>
                              c.contract.id === contract.id ||
                              c.contract.title === contract.title ||
                              (!c.contract.id &&
                                c.contract.title === contract.title)
                          ) || [];

                        return (
                          <ContractCard
                            key={contract.id || contract.title}
                            contract={contract}
                            matchedClauses={contractClauses.map((c: any) => ({
                              clause: c.clause,
                              clauseType: c.clauseType,
                            }))}
                          />
                        );
                      })}
                  </div>
                </div>
              )}

            {/* Analysis prominent */}
            {results.analysis && <AnalysisCard analysis={results.analysis} />}
          </>
        )}
      </div>
    </div>
  );
}
