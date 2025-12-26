# 🚀 Cursor Quick Start

## First Steps

1. **Open in Cursor**
```bash
cd /Users/thomasrehmer/Projects/graphrag_medium_legal
cursor .
```

2. **Initialize Next.js**
```bash
npx create-next-app@latest . --typescript --tailwind --app
```

3. **Install Dependencies**
```bash
npm install neo4j-driver @anthropic-ai/sdk
```

4. **Setup Environment**
```bash
cp .env.local.example .env.local
# Edit with your credentials
```

## 📁 Create Project Structure

```bash
mkdir -p app/api/query
mkdir -p app/components/{comparison,results,ui}
mkdir -p app/lib
mkdir -p docs
```

## 💻 Implementation Order

### Day 1: Backend
1. `app/lib/neo4j.ts` - Neo4j connection
2. `app/lib/claude.ts` - Claude API integration
3. `app/api/query/route.ts` - Main API endpoint

### Day 2: Frontend
1. `app/page.tsx` - Landing page
2. `app/components/results/ContractCard.tsx`
3. `app/components/comparison/SplitScreen.tsx`

### Day 3: Polish
1. Error handling
2. Loading states
3. Deploy to Vercel

## 🎯 Key Cursor Commands

```
@.cursorrules implement Neo4j connection

@.cursorrules create the 5 killer queries

@.cursorrules build side-by-side comparison UI
```

## 📚 Key Files

- `.cursorrules` - Complete project context
- `README.md` - Setup instructions
- `docs/queries.md` - Query documentation (create this!)

## Success Criteria

- ✅ 5 queries work end-to-end
- ✅ Side-by-side RAG vs GraphRAG comparison
- ✅ AI analysis adds value
- ✅ Mobile responsive

**Remember:** Ship fast, iterate on feedback!
