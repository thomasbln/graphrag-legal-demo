// lib/types.ts

export interface Contract {
  id: string
  title: string
  num_clauses: number
  context: string
}

export interface Clause {
  id: string
  text: string
  start_position: number
  is_impossible: boolean
}

export interface ClauseType {
  name: string
}

export interface QueryResult {
  contracts?: Contract[]
  clauses?: Array<{
    clause: Clause
    clauseType: ClauseType
    contract: Contract
  }>
  aggregations?: Record<string, any>
  cypher: string
  executionTime: number
  rawResults?: any[]
}

export interface Analysis {
  summary: string
  insights: string[]
  riskFlags?: string[]
  recommendations?: string[]
}

export interface QueryResponse {
  query: string
  result: QueryResult
  analysis: Analysis
  timestamp: string
  cached?: boolean
}

