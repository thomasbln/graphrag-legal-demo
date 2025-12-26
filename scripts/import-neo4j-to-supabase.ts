// scripts/import-neo4j-to-supabase.ts
// Import Neo4j contract data to Supabase with embeddings

import { executeCypher } from '../lib/neo4j/executor'
import { createClient } from '@supabase/supabase-js'
import OpenAI from 'openai'
import { config } from 'dotenv'

// Load environment variables from .env.local
config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

async function importContracts() {
  console.log('🚀 Starting import from Neo4j to Supabase...\n')
  
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('Missing Supabase credentials in .env.local')
  }
  
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('Missing OPENAI_API_KEY in .env.local')
  }
  
  // 1. Alle Contracts mit Clauses holen
  // Import all 415 contracts
  const query = `
    MATCH (c:Contract)-[:CONTAINS]->(cl:Clause)-[:OF_TYPE]->(ct:ClauseType)
    WITH c, collect({clause: cl, type: ct.name}) as clauses
    RETURN c, clauses
    ORDER BY c.id
  `
  
  console.log('📥 Fetching contracts from Neo4j...')
  const results = await executeCypher(query)
  
  console.log(`📊 Found ${results.length} contracts to import\n`)
  
  if (results.length === 0) {
    console.log('⚠️  No contracts found. Check Neo4j connection.')
    return
  }
  
  // Check which contracts are already imported
  console.log('🔍 Checking already imported contracts...')
  const { data: existingContracts } = await supabase
    .from('contracts')
    .select('id')
  
  const existingIds = new Set(existingContracts?.map(c => c.id) || [])
  const alreadyImported = existingIds.size
  const toImport = results.length - alreadyImported
  
  console.log(`   Already imported: ${alreadyImported}`)
  console.log(`   Remaining to import: ${toImport}\n`)
  
  let imported = 0
  let skipped = 0
  let errors = 0
  
  // Helper function to convert Neo4j Integer objects
  function convertNeo4jValue(value: any): any {
    if (value && typeof value === 'object') {
      // Neo4j Integer format: {low: number, high: number}
      if ('low' in value && 'high' in value) {
        // Convert to regular number
        return value.low + (value.high * 0x100000000)
      }
      // Neo4j Node properties
      if ('properties' in value) {
        const props: any = {}
        for (const [key, val] of Object.entries(value.properties)) {
          props[key] = convertNeo4jValue(val)
        }
        return props
      }
    }
    return value
  }

  for (const row of results) {
    const contractRaw = row.c as any
    const clausesRaw = row.clauses as Array<{clause: any, type: string}>
    
    // Convert Neo4j values
    const contract = convertNeo4jValue(contractRaw)
    const clauses = clausesRaw.map(c => ({
      clause: convertNeo4jValue(c.clause),
      type: c.type
    }))
    
    try {
      // Check if contract already exists
      if (existingIds.has(contract.id)) {
        skipped++
        if (skipped % 50 === 0) {
          console.log(`⏭️  Skipped ${skipped} already imported contracts...`)
        }
        continue
      }
      
      // 2. Contract Text zusammenfügen
      const contractText = clauses
        .map((c) => {
          const clauseText = c.clause.text || ''
          return `[${c.type}]: ${clauseText}`
        })
        .join('\n\n')
      
      // 3. Embedding für Contract generieren
      console.log(`📝 Generating embedding for ${contract.id}...`)
      const contractEmbedding = await openai.embeddings.create({
        model: 'text-embedding-3-small',
        input: contractText.slice(0, 8000), // Token limit
      })
      
      // Convert num_clauses to number if needed
      const numClauses = typeof contract.num_clauses === 'number' 
        ? contract.num_clauses 
        : (contract.num_clauses?.low || clauses.length)
      
      // 4. Contract in Supabase speichern
      const { error: contractError } = await supabase
        .from('contracts')
        .upsert({
          id: contract.id,
          title: contract.title || 'Untitled Contract',
          text: contractText,
          num_clauses: numClauses,
          context: contract.context || '',
          embedding: contractEmbedding.data[0].embedding,
        })
      
      if (contractError) {
        console.error(`❌ Error importing contract ${contract.id}:`, contractError)
        errors++
        continue
      }
      
      // 5. Clauses importieren
      console.log(`   Importing ${clauses.length} clauses...`)
      for (const clauseData of clauses) {
        const clause = clauseData.clause
        
        if (!clause.text || clause.text.trim() === '') {
          continue // Skip empty clauses
        }
        
        const clauseEmbedding = await openai.embeddings.create({
          model: 'text-embedding-3-small',
          input: clause.text.slice(0, 8000),
        })
        
        // Convert start_position to number if needed
        const startPosition = typeof clause.start_position === 'number'
          ? clause.start_position
          : (clause.start_position?.low || 0)
        
        const { error: clauseError } = await supabase
          .from('clauses')
          .upsert({
            id: clause.id,
            contract_id: contract.id,
            text: clause.text,
            clause_type: clauseData.type,
            start_position: startPosition,
            embedding: clauseEmbedding.data[0].embedding,
          })
        
        if (clauseError) {
          console.error(`   ⚠️  Error importing clause ${clause.id}:`, clauseError.message)
        }
      }
      
      imported++
      console.log(`✅ Imported ${contract.id} (${clauses.length} clauses) - Progress: ${imported}/${results.length}`)
      
      // Rate limiting: Wait 200ms between contracts to avoid API limits
      // Also add progress indicator every 10 contracts
      if (imported % 10 === 0) {
        console.log(`\n📊 Progress: ${imported}/${results.length} contracts (${Math.round(imported/results.length*100)}%)\n`)
      }
      await new Promise(resolve => setTimeout(resolve, 200))
      
    } catch (error) {
      console.error(`❌ Error processing ${contract.id}:`, error)
      errors++
    }
  }
  
  console.log(`\n✅ Import complete!`)
  console.log(`   Imported: ${imported}`)
  console.log(`   Skipped: ${skipped} (already imported)`)
  console.log(`   Errors: ${errors}`)
  
  // Verify import
  const { count } = await supabase
    .from('contracts')
    .select('*', { count: 'exact', head: true })
  
  console.log(`\n📊 Supabase now has ${count} contracts`)
}

// Run import
importContracts().catch((error) => {
  console.error('💥 Fatal error:', error)
  process.exit(1)
})
