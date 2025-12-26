// app/api/query-mcp/route.ts

/**
 * Query API with MCP Support
 * 
 * This endpoint demonstrates the full flow but requires
 * Neo4j credentials for execution.
 * 
 * For testing with MCP directly in Cursor, use the chat interface.
 */

import { NextRequest, NextResponse } from 'next/server'
import { generateCypher } from '@/lib/openai/generate-cypher'
import { analyzeResults } from '@/lib/openai/analyze-results'
import { transformResults } from '@/lib/neo4j/queries'
import type { QueryResponse } from '@/lib/types'

export async function POST(req: NextRequest) {
  try {
    const { query, cypher: providedCypher, mcpResults } = await req.json()
    
    if (!query || typeof query !== 'string') {
      return NextResponse.json(
        { error: 'Query is required' },
        { status: 400 }
      )
    }
    
    const startTime = Date.now()
    
    // Option 1: Generate Cypher from natural language
    let cypher: string
    if (providedCypher) {
      cypher = providedCypher
    } else {
      cypher = await generateCypher(query)
    }
    
    // Option 2: Use provided MCP results (for testing)
    // If mcpResults are provided, skip execution
    let results: any[]
    if (mcpResults && Array.isArray(mcpResults)) {
      results = mcpResults
    } else {
      // Try to execute (will fail if no credentials)
      const { executeCypher } = await import('@/lib/neo4j/executor')
      results = await executeCypher(cypher)
    }
    
    const executionTime = Date.now() - startTime
    
    // 3. Transform results
    const result = transformResults(cypher, executionTime, results)
    
    // 4. Analyze with OpenAI
    const analysis = await analyzeResults(query, result)
    
    const response: QueryResponse = {
      query,
      result,
      analysis,
      timestamp: new Date().toISOString(),
    }
    
    return NextResponse.json(response)
    
  } catch (error) {
    console.error('Query error:', error)
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Unknown error',
        details: process.env.NODE_ENV === 'development' 
          ? String(error) 
          : undefined,
        hint: 'For testing: Provide mcpResults in request body, or configure Neo4j credentials',
      },
      { status: 500 }
    )
  }
}

