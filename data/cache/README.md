# Cache Files for Neo4j Query Results

This directory contains pre-computed query results for the 5 killer queries. These cache files are used as fallback when Neo4j is paused or unavailable (common with free-tier Neo4j Aura).

## File Structure

Each cache file follows this naming pattern:
- `query-{queryId}.json`

Where `queryId` matches the IDs from `lib/queries/killer-queries.ts`:
- `query-negative-search.json`
- `query-multi-criteria.json`
- `query-aggregation.json`
- `query-traversal.json`
- `query-boolean-logic.json`

## Cache File Format

Each cache file contains a complete `QueryResponse` object:

```json
{
  "query": "Contracts WITHOUT audit rights",
  "result": {
    "cypher": "MATCH (c:Contract)...",
    "executionTime": 245,
    "contracts": [...],
    "clauses": [...],
    "aggregations": {...}
  },
  "analysis": {
    "summary": "...",
    "insights": [...],
    "riskFlags": [...],
    "recommendations": [...]
  },
  "timestamp": "2025-01-XX...",
  "cached": true
}
```

## When Cache is Used

Cache files are automatically loaded when:
1. Neo4j connection fails (timeout, paused database, etc.)
2. Neo4j query execution throws an error
3. `queryId` is provided (not for custom queries)

The UI will display a warning badge: "⚠️ Using cached data (Neo4j paused)" when cached data is used.

## Updating Cache Files

To update cache files with fresh data:

1. Ensure Neo4j is running and accessible
2. Run each killer query via the UI or API
3. Copy the JSON response
4. Save to `data/cache/query-{queryId}.json`
5. Ensure `cached: true` flag is set

Or use the MCP Neo4j tools to run queries and generate cache files programmatically.

## Notes

- Cache files are committed to the repository (they're static demo data)
- Files can be large (include full contract/clause data)
- Cache ensures demo works even when Neo4j free tier auto-pauses

