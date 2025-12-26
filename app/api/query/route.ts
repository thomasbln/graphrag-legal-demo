// app/api/query/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { generateCypher } from '@/lib/openai/generate-cypher'
import { analyzeResults } from '@/lib/openai/analyze-results'
import { transformResults } from '@/lib/neo4j/queries'
import { getQueryById } from '@/lib/queries/killer-queries'
import type { QueryResponse } from '@/lib/types'

/**
 * Main Query API Endpoint
 * 
 * Flow:
 * 1. Accept queryId or query string
 * 2. If queryId: Lookup from KILLER_QUERIES, else use query string
 * 3. Generate Cypher from natural language
 * 4. Execute Cypher on Neo4j
 * 5. Analyze results with OpenAI
 * 6. Return combined response
 */
export async function POST(req: NextRequest) {
  try {
    const { queryId, query: queryString } = await req.json()
    
    // Support both queryId and query string for backward compatibility
    let query: string
    let queryMetadata: any = null
    
    if (queryId) {
      const killerQuery = getQueryById(queryId)
      if (!killerQuery) {
        return NextResponse.json(
          { error: `Query with id "${queryId}" not found` },
          { status: 400 }
        )
      }
      query = killerQuery.query
      queryMetadata = {
        id: killerQuery.id,
        description: killerQuery.description,
        category: killerQuery.category,
      }
    } else if (queryString && typeof queryString === 'string') {
      query = queryString
    } else {
      return NextResponse.json(
        { error: 'Either queryId or query string is required' },
        { status: 400 }
      )
    }
    
    const startTime = Date.now()
    
    // 1. Generate Cypher from natural language
    const cypher = await generateCypher(query)
    
    // 2. Execute on Neo4j via MCP
    // TODO: In production, configure MCP server connection
    // For now, this will need to be called via MCP tools in Cursor
    // or configured with MCP SDK
    
    // Placeholder: MCP execution
    // In Cursor, you can test this by calling MCP tools directly
    // For runtime, you'll need MCP server configuration
    
    const mcpResults = await executeCypherViaMCP(cypher)
    const executionTime = Date.now() - startTime
    
    // 3. Transform results
    const result = transformResults(cypher, executionTime, mcpResults)
    
    // 4. Analyze with OpenAI
    const analysis = await analyzeResults(query, result)
    
    const response: QueryResponse = {
      query,
      result,
      analysis,
      timestamp: new Date().toISOString(),
    }
    
    // Add query metadata if available
    if (queryMetadata) {
      (response as any).queryMetadata = queryMetadata
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
      },
      { status: 500 }
    )
  }
}

/**
 * Execute Cypher query
 * 
 * Uses neo4j-driver by default (production mode).
 * For MCP mode in development, configure NEO4J_MODE=mcp
 */
async function executeCypherViaMCP(cypher: string): Promise<any[]> {
  const { executeCypher } = await import('@/lib/neo4j/executor')
  return executeCypher(cypher)
}

