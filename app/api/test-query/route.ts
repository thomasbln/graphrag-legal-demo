// app/api/test-query/route.ts

/**
 * Test Query Endpoint
 * 
 * This endpoint demonstrates how to use MCP tools.
 * In Cursor, you can test MCP directly via chat.
 * 
 * For production, use the main /api/query route with neo4j-driver.
 */

import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { query } = await req.json()
  
  return NextResponse.json({
    message: 'MCP Test Endpoint',
    note: 'Use MCP tools directly in Cursor chat to test queries',
    example: 'Call @neo4j-cypher with your Cypher query',
    yourQuery: query,
    nextStep: 'Implement MCP client or use neo4j-driver for production',
  })
}

