# Neo4j Sample Data Import

This directory contains sample data from the CUAD (Contract Understanding Atticus Dataset) v1.

## Sample Data

- **File**: `cuad-contracts-sample.cypher`
- **Contents**: 5 contracts with their clauses and relationships
- **Format**: Cypher CREATE statements

## Import Instructions

### Option 1: Neo4j Desktop / Browser

1. Open Neo4j Browser or Neo4j Desktop
2. Copy the contents of `cuad-contracts-sample.cypher`
3. Paste into the Neo4j Browser query editor
4. Click "Run" to execute

### Option 2: cypher-shell (CLI)

```bash
cypher-shell -u neo4j -p your-password < cuad-contracts-sample.cypher
```

### Option 3: Neo4j Aura

1. Go to your Neo4j Aura dashboard
2. Click on your database instance
3. Click "Open Browser" or use the connection string
4. Copy/paste the Cypher file contents

## Verify Import

After importing, verify the data:

```cypher
// Count contracts
MATCH (c:Contract) RETURN count(c) as contract_count;

// Count clauses
MATCH (cl:Clause) RETURN count(cl) as clause_count;

// Count clause types
MATCH (ct:ClauseType) RETURN count(ct) as clause_type_count;

// Verify relationships
MATCH (c:Contract)-[:CONTAINS]->(cl:Clause)-[:OF_TYPE]->(ct:ClauseType)
RETURN count(*) as relationship_count;
```

Expected results:

- Contracts: 2 (simplified sample - full export has 5)
- Clauses: ~8-10 (simplified sample)
- Clause Types: 41
- Relationships: ~10-15 (simplified sample)

## Full Dataset

This is a **sample dataset** containing only 5 contracts for quick testing.

For the **full CUAD dataset**:

- **Official Source**: https://www.atticusprojectai.org/cuad
- **Full Dataset**: 510 contracts, 13,000+ clauses, 41 clause types
- **License**: CC BY 4.0

### Converting CUAD JSON to Neo4j

To convert the full CUAD dataset to Neo4j format:

1. Download CUAD dataset from the official website
2. Use the provided conversion scripts (if available in `/scripts/`)
3. Or use MCP Neo4j tools to import directly

The CUAD dataset is in JSON format. You'll need to:

- Parse JSON files
- Create Contract nodes
- Create Clause nodes
- Create ClauseType nodes
- Create CONTAINS relationships
- Create OF_TYPE relationships

## Troubleshooting

### Import fails with "already exists" error

If nodes already exist, you can:

- Clear existing data first: `MATCH (n) DETACH DELETE n;` (⚠️ deletes all data!)
- Or modify the Cypher file to use MERGE instead of CREATE

### Connection timeout

If using Neo4j Aura Free Tier:

- The database may auto-pause after inactivity
- Wait 30-60 seconds and try again
- The database will auto-resume

### File too large

The sample file is small by design. For full data export:

- Use the MCP Neo4j tools to query and export data
- Or manually query Neo4j and format as Cypher CREATE statements

## License

The sample data is based on CUAD v1 dataset, licensed under **CC BY 4.0**.

**Attribution**: Data based on CUAD v1 by The Atticus Project
