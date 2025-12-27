# Supabase Sample Data Import

This directory contains sample data from the CUAD (Contract Understanding Atticus Dataset) v1.

## Sample Data

- **File**: `cuad-contracts-sample.sql`
- **Contents**: Schema + 5 contracts with their clauses
- **Format**: SQL (PostgreSQL/Supabase compatible)

## Import Instructions

### Option 1: Supabase SQL Editor (Recommended)

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Click **New Query**
4. Copy the contents of `cuad-contracts-sample.sql`
5. Paste into the SQL Editor
6. Click **Run** (or press `Ctrl/Cmd + Enter`)

### Option 2: psql (PostgreSQL CLI)

```bash
psql -h your-supabase-host.supabase.co \
     -U postgres \
     -d postgres \
     -f cuad-contracts-sample.sql
```

Or using connection string:

```bash
psql "postgresql://postgres:[YOUR-PASSWORD]@[PROJECT-REF].supabase.co:5432/postgres" \
     -f cuad-contracts-sample.sql
```

## Verify Import

After importing, verify the data:

```sql
-- Count contracts
SELECT COUNT(*) as contract_count FROM contracts;

-- Count clauses
SELECT COUNT(*) as clause_count FROM clauses;

-- Check sample contract
SELECT id, title, num_clauses FROM contracts LIMIT 5;

-- Check sample clauses
SELECT id, contract_id, clause_type, text
FROM clauses
WHERE contract_id IN ('contract_0', 'contract_1')
LIMIT 10;
```

Expected results:

- Contracts: 2 (simplified sample - full export has 5)
- Clauses: ~8-10 (simplified sample)

## Generate Embeddings

The sample data does **not** include embeddings. You need to generate them:

### Using OpenAI API

After importing, run the embedding generation script (if available):

```bash
# Using the import script
npm run import:generate-embeddings

# Or manually via API
# See scripts/import-neo4j-to-supabase.ts for reference
```

### Manual Generation

1. Get OpenAI API key
2. For each contract/clause, call OpenAI Embeddings API:
   ```javascript
   const embedding = await openai.embeddings.create({
     model: "text-embedding-3-small",
     input: contractText,
   });
   ```
3. Update the row:
   ```sql
   UPDATE contracts
   SET embedding = '[...embedding vector...]'
   WHERE id = 'contract_0';
   ```

See `scripts/import-neo4j-to-supabase.ts` for a complete example.

## Full Dataset

This is a **sample dataset** containing only 5 contracts for quick testing.

For the **full CUAD dataset**:

- **Official Source**: https://www.atticusprojectai.org/cuad
- **Full Dataset**: 510 contracts, 13,000+ clauses, 41 clause types
- **License**: CC BY 4.0

### Converting CUAD JSON to Supabase

To convert the full CUAD dataset to Supabase format:

1. Download CUAD dataset from the official website
2. Use the provided conversion scripts (if available in `/scripts/`)
3. Or use MCP Supabase tools to import directly

The CUAD dataset is in JSON format. You'll need to:

- Parse JSON files
- Insert into `contracts` table
- Insert into `clauses` table
- Generate embeddings using OpenAI API
- Update embeddings in database

## Vector Search

After generating embeddings, you can use vector search:

```sql
-- Example: Find similar contracts
SELECT
  id,
  title,
  1 - (embedding <=> '[your query embedding]') as similarity
FROM contracts
WHERE embedding IS NOT NULL
ORDER BY embedding <=> '[your query embedding]'
LIMIT 10;

-- Or use the helper function
SELECT * FROM match_contracts('[your query embedding]', 0.7, 10);
```

## Troubleshooting

### pgvector extension error

If you see "extension vector does not exist":

- Make sure you're using Supabase (has pgvector pre-installed)
- Or install manually: `CREATE EXTENSION IF NOT EXISTS vector;`

### Embedding generation fails

- Check OpenAI API key is set correctly
- Check rate limits (OpenAI has usage limits)
- For large datasets, batch the requests

### Import fails with duplicate key

If data already exists:

- Drop tables first: `DROP TABLE IF EXISTS clauses; DROP TABLE IF EXISTS contracts;`
- Or modify SQL to use `INSERT ... ON CONFLICT DO NOTHING`

## License

The sample data is based on CUAD v1 dataset, licensed under **CC BY 4.0**.

**Attribution**: Data based on CUAD v1 by The Atticus Project
