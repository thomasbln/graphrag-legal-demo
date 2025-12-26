# GraphRAG Legal Demo

Demo application proving **GraphRAG > RAG** for legal contract queries.

**Article:** "Building the Context Layer: How Knowledge Graphs Turn Legal Documents Into Queryable Intelligence"

---

## 🎯 Project Goal

Demonstrate how Knowledge Graphs (Neo4j) + AI (Claude) solve queries that traditional RAG cannot handle.

**Core Message:** Structure beats similarity for queryable intelligence.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 16+ (App Router, React 19)
- **Language:** TypeScript 5.7+
- **Styling:** Tailwind CSS v4
- **Database:** Neo4j Aura (Graph DB)
- **AI:** Claude API (Anthropic)
- **Deployment:** Vercel

---

## 📁 Next.js 16 Project Structure

### Best Practices for Directory Organization

```
graphrag_medium_legal/
│
├── AGENTS.md              # This file (agent guidance)
├── .cursorrules           # Detailed Cursor context
├── README.md              # User documentation
│
├── app/                   # Next.js 16 App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Landing page
│   ├── globals.css        # Tailwind imports
│   └── api/
│       └── query/
│           └── route.ts   # Main API endpoint
│
├── components/            # React components (NOT in app/)
│   ├── comparison/
│   │   ├── split-screen.tsx
│   │   ├── rag-column.tsx
│   │   └── graphrag-column.tsx
│   ├── results/
│   │   ├── contract-card.tsx
│   │   ├── analysis-card.tsx
│   │   └── query-stats.tsx
│   └── ui/
│       ├── search-bar.tsx
│       ├── button.tsx
│       └── badge.tsx
│
├── lib/                   # Business logic (NOT in app/)
│   ├── neo4j/
│   │   ├── client.ts
│   │   └── queries.ts
│   ├── claude/
│   │   ├── generate-cypher.ts
│   │   └── analyze-results.ts
│   ├── prompts/
│   │   ├── cypher-generation.ts
│   │   └── analysis.ts
│   ├── queries/
│   │   └── killer-queries.ts
│   ├── types.ts
│   └── utils.ts
│
├── hooks/                 # Custom React hooks
│   ├── use-query.ts
│   └── use-debounce.ts
│
└── docs/                  # Documentation
    ├── queries.md
    └── clause-types.md
```

---

## 📐 Code Organization Rules

### File Size Limits
- **Maximum: 250 lines per file** (strict rule)
- **Target: 150 lines per file** (ideal)
- Break into smaller modules when approaching 200 lines

### Next.js 16 Directory Rules

**`app/` directory (Routes Only):**
- ✅ Routes (page.tsx, layout.tsx)
- ✅ API routes (api/*/route.ts)
- ✅ Loading/Error states
- ❌ NO React components
- ❌ NO business logic

**`components/` directory (UI Components):**
- ✅ All React components
- ✅ Keep focused (single responsibility)
- ✅ Max 250 lines per component

**`lib/` directory (Business Logic):**
- ✅ Database clients
- ✅ API integrations
- ✅ Utilities
- ✅ Type definitions
- ❌ NO React components

**`hooks/` directory (React Hooks):**
- ✅ Custom hooks only
- ✅ Reusable stateful logic

**`docs/` directory (Documentation):**
- ✅ Technical docs
- ✅ Query examples
- ✅ Reference materials

---

## 🚀 Dev Environment Setup

```bash
# 1. Create Next.js 16 app (you'll do this)
npx create-next-app@latest . --typescript --tailwind --app

# 2. Install additional dependencies
npm install neo4j-driver @anthropic-ai/sdk

# 3. Configure environment
cp .env.local.example .env.local
# Add: NEO4J_URI, NEO4J_USER, NEO4J_PASSWORD, ANTHROPIC_API_KEY

# 4. Start dev server
npm run dev
```

---

## 🎨 Core Features

### The 5 Killer Queries
Each demonstrates a RAG limitation that GraphRAG solves:

1. **Negative Search** - "Contracts WITHOUT audit rights"
   - RAG: ❌ Cannot search for absence
   - GraphRAG: ✅ `WHERE NOT EXISTS`

2. **Multi-Criteria** - "Revenue sharing AND non-compete"
   - RAG: ❌ Returns either, not both
   - GraphRAG: ✅ Multi-hop traversal

3. **Aggregation** - "Count by liability type"
   - RAG: ❌ Cannot aggregate
   - GraphRAG: ✅ Native counting

4. **Relationship Traversal** - "All clauses from expiring contracts"
   - RAG: ❌ Loses context
   - GraphRAG: ✅ Follow relationships

5. **Complex Boolean** - "(Revenue OR Profit) AND (CA OR NY)"
   - RAG: ❌ Boolean logic fails
   - GraphRAG: ✅ Native AND/OR/NOT

---

## 💻 Implementation Guidelines

### Component Pattern (Max 250 lines)
```typescript
// components/results/contract-card.tsx
'use client'

import { type Contract } from '@/lib/types'

interface Props {
  contract: Contract
}

export function ContractCard({ contract }: Props) {
  // Logic + JSX (<250 lines total)
}
```

### API Route Pattern (Max 250 lines)
```typescript
// app/api/query/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { generateCypher } from '@/lib/claude/generate-cypher'
import { executeQuery } from '@/lib/neo4j/queries'

export async function POST(req: NextRequest) {
  // Orchestration only (<200 lines)
  // Import logic from lib/
}
```

### Library Module Pattern (Max 200 lines)
```typescript
// lib/neo4j/queries.ts
import { driver } from './client'

export async function executeQuery(cypher: string) {
  // Query logic (<150 lines)
}
```

---

## 📝 Implementation Order

### Phase 1: Backend
1. `lib/neo4j/` - Database connection
2. `lib/claude/` - AI integration
3. `lib/prompts/` - LLM prompts
4. `app/api/query/route.ts` - API endpoint

### Phase 2: Frontend
1. `components/ui/` - Basic UI components
2. `components/results/` - Result display
3. `components/comparison/` - Split screen
4. `app/page.tsx` - Landing page

### Phase 3: Polish
1. Error handling
2. Loading states
3. Mobile responsive
4. Deploy

---

## 🧪 Testing Strategy

### Manual Testing (For Demo)
- [ ] All 5 queries work
- [ ] Side-by-side comparison clear
- [ ] AI analysis valuable
- [ ] Mobile responsive
- [ ] Neo4j sleep handling

**Note:** Unit tests optional for demo project.

---

## 📖 Key Documentation Files

### Read First
1. **AGENTS.md** (this file) - Overview
2. **.cursorrules** - Complete context
3. **README.md** - Setup instructions

### Reference
- **docs/queries.md** - Query details
- **docs/clause-types.md** - All 41 types

---

## 💡 Code Style

### Naming
- Files: `kebab-case.tsx`
- Components: `PascalCase`
- Functions: `camelCase`
- Constants: `UPPER_SNAKE_CASE`

### Organization
```typescript
// 1. Imports
// 2. Types
// 3. Component/Function
// 4. Exports
```

---

## 🐛 Common Issues

### Neo4j Connection
**Problem:** Connection timeout  
**Solution:** Neo4j Aura auto-paused, wait 30s

### File Too Large
**Problem:** File >250 lines  
**Solution:** Extract to smaller modules

### Import Errors
**Problem:** Cannot import `@/lib`  
**Solution:** Check tsconfig.json paths

---

## 🎯 Success Criteria

### Code Quality
- ✅ No file >250 lines
- ✅ Components in `components/`
- ✅ Logic in `lib/`
- ✅ Hooks in `hooks/`
- ✅ Clean imports with `@/`

### Functionality
- ✅ 5 queries work end-to-end
- ✅ Side-by-side comparison
- ✅ AI analysis adds value
- ✅ Mobile responsive

---

## 👤 Author

Thomas Rehmer  
- Article: [Medium] (coming soon)

---

**Key Principles:**
1. Next.js 16+ with App Router
2. Max 250 lines per file
3. Components in `components/`, not `app/`
4. Logic in `lib/`, docs in `docs/`

**Core Message:**  
Structure beats similarity for queryable intelligence.
