// lib/neo4j/executor.ts

/**
 * Neo4j Query Executor
 * 
 * Supports two modes:
 * 1. MCP Mode (Development): Uses MCP tools via Cursor
 * 2. Driver Mode (Production): Uses neo4j-driver directly
 */

export interface Neo4jConfig {
  mode: 'mcp' | 'driver'
  // For driver mode
  uri?: string
  user?: string
  password?: string
}

/**
 * Execute Cypher query
 * 
 * In MCP mode: Returns placeholder (MCP tools called via Cursor)
 * In Driver mode: Uses neo4j-driver
 */
export async function executeCypher(
  cypher: string,
  config?: Neo4jConfig
): Promise<any[]> {
  const mode = config?.mode || process.env.NEO4J_MODE || 'driver'
  
  if (mode === 'mcp') {
    // MCP mode: Tools are available in Cursor
    // For runtime, you'd need MCP server connection
    throw new Error(
      'MCP mode: Use MCP tools directly in Cursor chat, ' +
      'or configure MCP server for runtime execution'
    )
  }
  
  // Driver mode: Use neo4j-driver
  return executeWithDriver(cypher, config)
}

/**
 * Execute with neo4j-driver
 */
async function executeWithDriver(
  cypher: string,
  config?: Neo4jConfig
): Promise<any[]> {
  // Dynamic import to avoid issues if driver not available
  const neo4j = await import('neo4j-driver')
  
  const uri = config?.uri || process.env.NEO4J_URI
  const user = config?.user || process.env.NEO4J_USER || process.env.NEO4J_USERNAME
  const password = config?.password || process.env.NEO4J_PASSWORD
  
  if (!uri || !user || !password) {
    throw new Error(
      'Neo4j credentials not configured. ' +
      'Set NEO4J_URI, NEO4J_USER, NEO4J_PASSWORD in .env.local'
    )
  }
  
  const driver = neo4j.driver(uri, neo4j.auth.basic(user, password))
  const session = driver.session()
  
  try {
    const result = await session.run(cypher)
    return result.records.map(record => {
      const obj: Record<string, any> = {}
      record.keys.forEach(key => {
        const keyStr = String(key) // Ensure key is a string
        const value = record.get(key)
        // Convert Neo4j types to plain JS
        if (neo4j.isInt(value)) {
          obj[keyStr] = value.toNumber()
        } else if (value && typeof value === 'object' && 'properties' in value) {
          // Node or Relationship
          obj[keyStr] = (value as any).properties
        } else {
          obj[keyStr] = value
        }
      })
      return obj
    })
  } finally {
    await session.close()
    await driver.close()
  }
}

