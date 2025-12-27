# CUAD Dataset - Sample Data

This directory contains **sample data** from the CUAD (Contract Understanding Atticus Dataset) v1 for the GraphRAG Legal Demo.

## Dataset Source

**CUAD (Contract Understanding Atticus Dataset) v1**
- **Official Website**: https://www.atticusprojectai.org/cuad
- **License**: CC BY 4.0
- **Attribution**: Data based on CUAD v1 by The Atticus Project

## Sample Data Included

This repository includes **sample data** for quick testing:

- **5 Contracts** (representative sample from CUAD v1)
- **~8-10 Clauses** (subset from those 5 contracts)
- **41 Clause Types** (all types included)

### Directory Structure

```
/data
  /neo4j
    - README.md                      # Neo4j import instructions
    - cuad-contracts-sample.cypher   # Neo4j graph database export
  /supabase
    - README.md                      # Supabase import instructions
    - cuad-contracts-sample.sql      # Supabase/PostgreSQL export
```

## Full Dataset

For the **complete dataset**:

- **510 Contracts** (CUAD v1 full)
- **13,000+ Clauses**
- **41 Clause Types**

Download the full dataset from: https://www.atticusprojectai.org/cuad

### Converting Full Dataset

The CUAD dataset is provided in JSON format. To convert to Neo4j or Supabase:

1. **Download** CUAD dataset from official website
2. **Use conversion scripts** (if available in `/scripts/`)
3. **Or use MCP tools** to import directly

## Quick Start

### Neo4j Import

See [`/neo4j/README.md`](./neo4j/README.md) for detailed instructions.

Quick import:
```bash
# Using cypher-shell
cypher-shell -u neo4j -p password < neo4j/cuad-contracts-sample.cypher

# Or copy/paste into Neo4j Browser
```

### Supabase Import

See [`/supabase/README.md`](./supabase/README.md) for detailed instructions.

Quick import:
```bash
# Using psql
psql "postgresql://postgres:[PASSWORD]@[PROJECT-REF].supabase.co:5432/postgres" \
     -f supabase/cuad-contracts-sample.sql

# Or use Supabase SQL Editor (recommended)
```

## Data Model

### Neo4j (Graph Database)

```
(Contract)-[:CONTAINS]->(Clause)-[:OF_TYPE]->(ClauseType)
```

**Nodes**:
- `Contract`: {id, title, num_clauses, context}
- `Clause`: {id, text, start_position, is_impossible}
- `ClauseType`: {name}

### Supabase (Vector Database)

**Tables**:
- `contracts`: {id, title, text, num_clauses, context, embedding}
- `clauses`: {id, contract_id, text, clause_type, start_position, embedding}

**Features**:
- Vector embeddings for semantic search
- Full-text search capabilities
- PostgreSQL compatibility

## Use Cases

This sample data is sufficient for:

- ✅ Testing GraphRAG queries
- ✅ Understanding the data structure
- ✅ Development and prototyping
- ✅ Demo purposes

For production or research:
- Use the **full CUAD dataset** (510 contracts)
- Download from official source
- Convert using provided scripts

## License Information

**CUAD Dataset License**: CC BY 4.0

This means you can:
- ✅ Use the data for any purpose
- ✅ Share and redistribute
- ✅ Adapt and modify
- ✅ Use commercially

**Required**: Attribution to The Atticus Project

**Attribution Example**:
> Data based on CUAD v1 by The Atticus Project.  
> Source: https://www.atticusprojectai.org/cuad  
> License: CC BY 4.0

## Related Links

- **CUAD Official**: https://www.atticusprojectai.org/cuad
- **CUAD Paper**: Search for "CUAD Contract Understanding Atticus Dataset" on arXiv
- **Project README**: See main [README.md](../README.md) for setup instructions

## Troubleshooting

### Import Issues

- **Neo4j**: See [`/neo4j/README.md`](./neo4j/README.md)
- **Supabase**: See [`/supabase/README.md`](./supabase/README.md)

### Data Questions

- **Sample too small?** Download full dataset from CUAD website
- **Missing embeddings?** Generate using OpenAI API (see Supabase README)
- **Schema questions?** Check the import READMEs for data model details

## Notes

- **Legal Safety**: Only sample data in repo, full data via CUAD link
- **File Size**: Sample files are intentionally small (< 50KB each)
- **Embeddings**: Not included in sample (generate separately)
- **Full Export**: Use MCP tools or scripts for complete data export

