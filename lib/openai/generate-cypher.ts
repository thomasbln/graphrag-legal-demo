// lib/openai/generate-cypher.ts

import { openai } from '@ai-sdk/openai'
import { generateText } from 'ai'
import { cypherSystemPrompt, buildCypherPrompt } from '@/lib/prompts/cypher-generation'

/**
 * Generate Cypher query from natural language using OpenAI
 */
export async function generateCypher(userQuery: string): Promise<string> {
  const { text } = await generateText({
    model: openai('gpt-4o'), // or 'gpt-4-turbo' for cheaper option
    system: cypherSystemPrompt,
    prompt: buildCypherPrompt(userQuery),
    temperature: 0.1, // Low temperature for precise queries
    maxTokens: 500,
  })
  
  // Clean up response (remove markdown code blocks if present)
  let cypher = text.trim()
  
  // Remove ```cypher or ``` if present
  cypher = cypher.replace(/^```cypher\n?/i, '')
  cypher = cypher.replace(/^```\n?/i, '')
  cypher = cypher.replace(/\n?```$/i, '')
  
  // Remove any leading/trailing whitespace
  cypher = cypher.trim()
  
  return cypher
}

