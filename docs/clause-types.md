# CUAD Dataset - 41 Clause Types Reference

This file contains all 41 clause types available in the CUAD (Contract Understanding Atticus Dataset) for reference when generating Cypher queries.

## Complete List (Alphabetical)

1. Affiliate License-Licensee
2. Affiliate License-Licensor
3. Agreement Date
4. Anti-Assignment
5. Audit Rights
6. Cap On Liability
7. Change Of Control
8. Competitive Restriction Exception
9. Covenant Not To Sue
10. Document Name
11. Effective Date
12. Exclusivity
13. Expiration Date
14. Governing Law
15. Insurance
16. Ip Ownership Assignment
17. Irrevocable Or Perpetual License
18. Joint Ip Ownership
19. License Grant
20. Liquidated Damages
21. Minimum Commitment
22. Most Favored Nation
23. No-Solicit Of Customers
24. No-Solicit Of Employees
25. Non-Compete
26. Non-Disparagement
27. Non-Transferable License
28. Notice Period To Terminate Renewal
29. Parties
30. Post-Termination Services
31. Price Restrictions
32. Renewal Term
33. Revenue/Profit Sharing
34. Rofr/Rofo/Rofn (Right of First Refusal/Offer/Negotiation)
35. Source Code Escrow
36. Termination For Convenience
37. Third Party Beneficiary
38. Uncapped Liability
39. Unlimited/All-You-Can-Eat-License
40. Volume Restriction
41. Warranty Duration

## By Category

### Identification & Dates

- Document Name
- Parties
- Agreement Date
- Effective Date
- Expiration Date

### Financial Terms

- Revenue/Profit Sharing
- Price Restrictions
- Minimum Commitment
- Liquidated Damages
- Most Favored Nation

### Liability & Risk

- Cap On Liability
- Uncapped Liability
- Insurance
- Warranty Duration
- Covenant Not To Sue

### Licensing & IP

- License Grant
- Affiliate License-Licensee
- Affiliate License-Licensor
- Ip Ownership Assignment
- Joint Ip Ownership
- Irrevocable Or Perpetual License
- Non-Transferable License
- Unlimited/All-You-Can-Eat-License
- Source Code Escrow

### Restrictions & Protections

- Non-Compete
- Competitive Restriction Exception
- No-Solicit Of Customers
- No-Solicit Of Employees
- Non-Disparagement
- Exclusivity
- Volume Restriction
- Anti-Assignment

### Termination & Renewal

- Renewal Term
- Notice Period To Terminate Renewal
- Termination For Convenience
- Post-Termination Services
- Change Of Control

### Governance

- Governing Law
- Audit Rights
- Third Party Beneficiary
- Rofr/Rofo/Rofn

## Usage Frequency (Based on Dataset)

**Most Common (>300 occurrences):**

- Document Name (415)
- Parties (414)
- Agreement Date (383)
- Governing Law (361)
- Expiration Date (337)

**Common (200-300 occurrences):**

- Effective Date (314)
- Anti-Assignment (309)
- Cap On Liability (225)
- License Grant (213)

**Moderate (100-200 occurrences):**

- Audit Rights (175)
- Non-Compete (varies - often empty)
- Renewal Term (varies)

**Less Common (<100 occurrences):**

- Most specialized clauses
- Note: Some clause types may have many contracts but empty text fields

## Important Notes for Query Generation

### Empty Text Fields

Some clauses may have `text = ''` even when they exist. When counting or searching:

```cypher
// To find clauses that exist AND have text
WHERE cl.text <> ''

// To just check if clause type exists
MATCH (c)-[:CONTAINS]->(:Clause)-[:OF_TYPE]->(ct:ClauseType)
WHERE ct.name = 'ClauseName'
```

### Exact Naming

Clause type names must match EXACTLY (case-sensitive):

- ✅ "Revenue/Profit Sharing"
- ❌ "Revenue Sharing"
- ❌ "revenue/profit sharing"

### Common Aliases Users Might Use

When user says... they probably mean:

- "revenue sharing" → `Revenue/Profit Sharing`
- "non-compete" → `Non-Compete`
- "audit rights" → `Audit Rights`
- "liability cap" → `Cap On Liability`
- "unlimited liability" → `Uncapped Liability`
- "termination" → `Termination For Convenience`
- "renewal" → `Renewal Term` or `Notice Period To Terminate Renewal`
- "governing law" → `Governing Law`
- "expiration" → `Expiration Date`

### Multi-Word Queries

User might ask about multiple clause types:

- "IP protection clauses" → Could include: `Ip Ownership Assignment`, `Joint Ip Ownership`, `License Grant`
- "employee protections" → Could include: `No-Solicit Of Employees`, `Non-Compete`
- "customer protections" → Could include: `No-Solicit Of Customers`, `Exclusivity`

## Query Generation Tips

### 1. Normalize User Input

```typescript
function normalizeClauseType(userInput: string): string {
  const mapping = {
    "revenue sharing": "Revenue/Profit Sharing",
    "profit sharing": "Revenue/Profit Sharing",
    "non compete": "Non-Compete",
    noncompete: "Non-Compete",
    audit: "Audit Rights",
    "liability cap": "Cap On Liability",
    // ... etc
  };
  return mapping[userInput.toLowerCase()] || userInput;
}
```

### 2. Handle Ambiguity

If user says "license", could mean:

- License Grant
- Affiliate License-Licensee
- Affiliate License-Licensor
- Irrevocable Or Perpetual License
- Non-Transferable License
- Unlimited/All-You-Can-Eat-License

Ask for clarification or return all.

### 3. Common Patterns

**Finding contracts with specific clause:**

```cypher
MATCH (c:Contract)-[:CONTAINS]->(:Clause)-[:OF_TYPE]->(ct:ClauseType)
WHERE ct.name = 'Revenue/Profit Sharing'
RETURN c.title
```

**Finding contracts without specific clause:**

```cypher
MATCH (c:Contract)
WHERE NOT EXISTS {
  MATCH (c)-[:CONTAINS]->(:Clause)-[:OF_TYPE]->(ct:ClauseType)
  WHERE ct.name = 'Audit Rights'
}
RETURN c.title
```

**Multiple clause types (OR):**

```cypher
WHERE ct.name IN ['Revenue/Profit Sharing', 'License Grant']
```

**Multiple clauses (AND):**

```cypher
MATCH (c:Contract)-[:CONTAINS]->(:Clause)-[:OF_TYPE]->(ct1:ClauseType)
WHERE ct1.name = 'Revenue/Profit Sharing'
WITH c
MATCH (c)-[:CONTAINS]->(:Clause)-[:OF_TYPE]->(ct2:ClauseType)
WHERE ct2.name = 'Non-Compete'
RETURN c
```

## For AI Prompt Context

When generating Cypher queries, remember:

1. Always use exact clause type names from this list
2. Consider user intent - they may use informal names
3. Some clause types are rare - check frequency if query returns 0 results
4. Empty text fields are common - filter with `cl.text <> ''` when needed
5. Multiple clause types may match user's intent - ask for clarification if ambiguous
