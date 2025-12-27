// lib/openai/analyze-results.ts

import { openai } from '@ai-sdk/openai'
import { generateText } from 'ai'
import type { QueryResult } from '@/lib/types'

const analysisSystemPrompt = `You are a legal contract analysis expert analyzing results from GraphRAG (Knowledge Graph + AI).

GraphRAG's key advantage: It provides BOTH aggregated data (counts, summaries) AND detailed results (specific contracts, clauses) in a single query - something traditional RAG cannot do.

Analyze query results and provide:
1. A concise summary of what was found - highlight when both aggregated counts AND detailed contracts/clauses are available
2. Key insights (business implications, risks, opportunities)
3. Risk flags (if any)
4. Actionable recommendations

Be specific, data-driven, and business-focused. When results include both aggregations and detailed contracts/clauses, emphasize this dual capability as a strategic advantage for legal analysis.`

export async function analyzeResults(
  userQuery: string,
  result: QueryResult
): Promise<{
  summary: string
  insights: string[]
  riskFlags?: string[]
  recommendations?: string[]
}> {
  const resultSummary = JSON.stringify(result, null, 2)
  
  // Check if results include both aggregations and details (GraphRAG advantage)
  const hasAggregations = result.aggregations && Object.keys(result.aggregations).length > 0
  const hasContracts = result.contracts && result.contracts.length > 0
  const hasClauses = result.clauses && result.clauses.length > 0
  const hasGraphRAGAdvantage = hasAggregations && (hasContracts || hasClauses)
  
  const graphRAGContext = hasGraphRAGAdvantage 
    ? `\n\nIMPORTANT: These results demonstrate GraphRAG's unique capability - they include BOTH aggregated summaries (${hasAggregations ? 'counts/statistics' : ''}) AND detailed contracts/clauses in a single query. This enables strategic analysis where you can see the big picture (aggregated data) and drill into specific details (contracts, clauses) simultaneously - something traditional search cannot do.`
    : ''
  
  const { text } = await generateText({
    model: openai('gpt-4o'),
    system: analysisSystemPrompt,
    prompt: `User Query: "${userQuery}"

Query Results:
${resultSummary}${graphRAGContext}

Provide analysis in this JSON format:
{
  "summary": "Brief summary - if results include both aggregations and details, mention this GraphRAG advantage",
  "insights": ["insight1", "insight2"],
  "riskFlags": ["risk1"] (optional),
  "recommendations": ["rec1"] (optional)
}`,
    temperature: 0.3,
    maxTokens: 1200,
  } as any)
  
  try {
    // Try to parse JSON response
    const cleaned = text.trim()
      .replace(/^```json\n?/i, '')
      .replace(/^```\n?/i, '')
      .replace(/\n?```$/i, '')
    
    const parsed = JSON.parse(cleaned)
    return {
      summary: parsed.summary || 'Analysis completed',
      insights: parsed.insights || [],
      riskFlags: parsed.riskFlags,
      recommendations: parsed.recommendations,
    }
  } catch {
    // Fallback: parse from text
    return {
      summary: text.split('\n')[0] || 'Analysis completed',
      insights: text.split('\n').slice(1).filter(Boolean),
    }
  }
}

