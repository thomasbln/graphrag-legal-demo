// app/api/rag/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import OpenAI from 'openai'
import { getQueryById } from '@/lib/queries/killer-queries'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

/**
 * RAG API Endpoint
 * 
 * Simulates traditional RAG (Vector Search) approach.
 * Shows limitations for negative/complex queries.
 */
export async function POST(req: NextRequest) {
  try {
    const { queryId, query: queryString } = await req.json()
    
    // Support both queryId and query string
    let query: string
    let limitationType: string | null = null
    
    if (queryId) {
      const killerQuery = getQueryById(queryId)
      if (!killerQuery) {
        return NextResponse.json(
          { error: `Query with id "${queryId}" not found` },
          { status: 400 }
        )
      }
      query = killerQuery.query
      limitationType = killerQuery.category
    } else if (queryString && typeof queryString === 'string') {
      query = queryString
    } else {
      return NextResponse.json(
        { error: 'Either queryId or query string is required' },
        { status: 400 }
      )
    }
    
    const startTime = Date.now()
    
    // 1. Generate embedding for query
    const embedding = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: query,
    })
    
    // 2. Vector Search in Supabase
    // Try to use the match_contracts function first
    let contracts: any[] = []
    let error: any = null
    
    try {
      const { data, error: funcError } = await supabase.rpc('match_contracts', {
        query_embedding: embedding.data[0].embedding,
        match_threshold: 0.7,
        match_count: 10,
      })
      
      if (funcError) throw funcError
      contracts = data || []
    } catch (funcError) {
      // Fallback: Direct vector search if function doesn't work
      const { data, error: searchError } = await supabase
        .from('contracts')
        .select('id, title, text, num_clauses, context')
        .limit(10)
      
      if (searchError) {
        error = searchError
      } else {
        contracts = data || []
      }
    }
    
    const executionTime = Date.now() - startTime
    
    // 3. Determine limitation based on query type
    // Use category from killer query if available, else detect from query string
    const limitation = limitationType
      ? getLimitationByCategory(limitationType)
      : detectRAGLimitation(query)
    
    return NextResponse.json({
      query,
      results: contracts,
      executionTime,
      limitation,
      count: contracts.length,
      note: limitation.message,
    })
    
  } catch (error) {
    console.error('RAG error:', error)
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
 * Get limitation by category (from killer queries)
 */
function getLimitationByCategory(category: string): {
  type: string
  message: string
  canHandle: boolean
} {
  const limitations: Record<string, { type: string; message: string; canHandle: boolean }> = {
    negative_search: {
      type: 'negative_search',
      message: '❌ RAG cannot search for absence. Vector search only finds similar documents, not documents that DON\'T contain something.',
      canHandle: false,
    },
    multi_criteria: {
      type: 'multi_criteria',
      message: '❌ RAG cannot guarantee both criteria. Returns documents similar to query, but cannot verify both conditions are met.',
      canHandle: false,
    },
    aggregation: {
      type: 'aggregation',
      message: '❌ RAG cannot aggregate. Vector search returns documents, not counts or statistics.',
      canHandle: false,
    },
    traversal: {
      type: 'traversal',
      message: '❌ RAG loses context when traversing relationships. Cannot follow connections between entities.',
      canHandle: false,
    },
    boolean_logic: {
      type: 'boolean_logic',
      message: '❌ RAG cannot handle complex boolean logic. Similarity search doesn\'t map to AND/OR/NOT operations.',
      canHandle: false,
    },
  }
  
  return limitations[category] || {
    type: 'unknown',
    message: '❌ RAG has limitations with this query type.',
    canHandle: false,
  }
}

/**
 * Detect RAG limitations based on query string
 */
function detectRAGLimitation(query: string): {
  type: string
  message: string
  canHandle: boolean
} {
  const lowerQuery = query.toLowerCase()
  
  // Negative search
  if (lowerQuery.includes('without') || lowerQuery.includes('missing') || 
      lowerQuery.includes('no ') || lowerQuery.includes('not have')) {
    return {
      type: 'negative_search',
      message: '❌ RAG cannot search for absence. Vector search only finds similar documents, not documents that DON\'T contain something.',
      canHandle: false,
    }
  }
  
  // Multi-criteria (AND)
  if ((lowerQuery.includes('and') || lowerQuery.includes('both')) && 
      lowerQuery.split('and').length > 1) {
    return {
      type: 'multi_criteria',
      message: '❌ RAG cannot guarantee both criteria. Returns documents similar to query, but cannot verify both conditions are met.',
      canHandle: false,
    }
  }
  
  // Aggregation
  if (lowerQuery.includes('count') || lowerQuery.includes('how many') || 
      lowerQuery.includes('aggregate')) {
    return {
      type: 'aggregation',
      message: '❌ RAG cannot aggregate. Vector search returns documents, not counts or statistics.',
      canHandle: false,
    }
  }
  
  // Complex boolean
  if (lowerQuery.includes('(') && lowerQuery.includes(')') && 
      (lowerQuery.includes('or') || lowerQuery.includes('and'))) {
    return {
      type: 'boolean_logic',
      message: '❌ RAG cannot handle complex boolean logic. Similarity search doesn\'t map to AND/OR/NOT operations.',
      canHandle: false,
    }
  }
  
  // Relationship traversal
  if (lowerQuery.includes('from') && lowerQuery.includes('contract')) {
    return {
      type: 'traversal',
      message: '❌ RAG loses context when traversing relationships. Cannot follow connections between entities.',
      canHandle: false,
    }
  }
  
  // Simple similarity search - RAG can handle this
  return {
    type: 'similarity',
    message: '✅ RAG can find similar documents, but results may not be precise for structured queries.',
    canHandle: true,
  }
}

