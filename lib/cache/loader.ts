// lib/cache/loader.ts

import fs from 'fs/promises'
import path from 'path'
import type { QueryResponse } from '@/lib/types'

const CACHE_DIR = path.join(process.cwd(), 'data', 'cache')

/**
 * Load cached query result from static JSON file
 * 
 * @param queryId - The killer query ID (e.g., 'negative-search')
 * @returns Cached QueryResponse or null if cache doesn't exist
 */
export async function loadCachedResult(queryId: string): Promise<QueryResponse | null> {
  try {
    const cacheFile = path.join(CACHE_DIR, `query-${queryId}.json`)
    
    // Read and parse cache file
    const fileContents = await fs.readFile(cacheFile, 'utf-8')
    const cachedData = JSON.parse(fileContents) as QueryResponse
    
    // Ensure cached flag is set
    return {
      ...cachedData,
      cached: true,
    }
  } catch (error) {
    // File doesn't exist or error reading - return null
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
      console.error(`Error loading cache for query ${queryId}:`, error)
    }
    return null
  }
}

/**
 * Check if cache is available for a query
 * 
 * @param queryId - The killer query ID
 * @returns true if cache file exists
 */
export async function isCacheAvailable(queryId: string): Promise<boolean> {
  try {
    const cacheFile = path.join(CACHE_DIR, `query-${queryId}.json`)
    await fs.access(cacheFile)
    return true
  } catch {
    return false
  }
}

