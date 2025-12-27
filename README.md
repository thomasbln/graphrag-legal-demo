This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## 🌐 Live Demo

**Live Demo:** [https://graphrag-legal-demo.vercel.app/](https://graphrag-legal-demo.vercel.app/)

Try out the 5 killer queries to see GraphRAG in action!

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Create Free Accounts

#### Neo4j Aura (Free Tier)

1. **Sign up** at [Neo4j Aura](https://neo4j.com/cloud/aura/) (free tier available)
2. **Create a free database instance**:
   - Choose "Free" tier
   - Select a region (e.g., EU or US)
   - Wait ~2-3 minutes for database creation
3. **Get your credentials**:
   - Copy the connection URI (format: `neo4j+s://xxxxx.databases.neo4j.io`)
   - Save your username (usually `neo4j`)
   - Save your password (shown once - save it securely!)

**Note**: Free tier databases auto-pause after inactivity. Wait 30-60 seconds when resuming.

#### Supabase (Free Tier)

1. **Sign up** at [Supabase](https://supabase.com) (free tier available)
2. **Create a new project**:
   - Click "New Project"
   - Choose organization (or create one)
   - Enter project name (e.g., `graphrag-legal-demo`)
   - Set database password (save it securely!)
   - Choose a region close to you
   - Wait ~2 minutes for project setup
3. **Get your credentials**:
   - Go to **Settings** → **API**
   - Copy `Project URL` (e.g., `https://xxxxx.supabase.co`)
   - Copy `anon` `public` key (for `NEXT_PUBLIC_SUPABASE_URL`)
   - Copy `service_role` `secret` key (for `SUPABASE_SERVICE_ROLE_KEY`) - keep this secret!

**Free Tier Limits**:
- 500 MB database storage
- 2 GB bandwidth/month
- More than sufficient for this demo

#### OpenAI API Key

1. **Sign up** at [OpenAI Platform](https://platform.openai.com)
2. **Add payment method** (required, but usage-based pricing)
3. **Create API key**:
   - Go to [API Keys](https://platform.openai.com/api-keys)
   - Click "Create new secret key"
   - Save the key immediately (shown only once!)

**Note**: OpenAI API has pay-as-you-go pricing. This demo uses minimal API calls.

### 3. Environment Setup

Copy the example environment file and configure your credentials:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your credentials from the accounts you just created:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# OpenAI
OPENAI_API_KEY=sk-proj-xxxxx

# Neo4j Aura
NEO4J_URI=neo4j+s://xxxxx.databases.neo4j.io
NEO4J_USERNAME=neo4j
NEO4J_PASSWORD=your-password
```

### 4. Data Setup

This project uses the **CUAD (Contract Understanding Atticus Dataset) v1** for legal contract data.

#### Option A: Use Sample Data (Quick Start)

Sample data is included in the `/data` directory for quick testing:

**Neo4j Import**:
```bash
# Using cypher-shell
cypher-shell -u neo4j -p password < data/neo4j/cuad-contracts-sample.cypher

# Or copy/paste into Neo4j Browser
```

**Supabase Import**:
1. Open Supabase SQL Editor
2. Copy contents of `data/supabase/cuad-contracts-sample.sql`
3. Paste and run in SQL Editor

See [`/data/README.md`](./data/README.md) for detailed import instructions.

#### Option B: Use Full Dataset

For the complete CUAD dataset (510 contracts):

1. **Download** from official source: https://www.atticusprojectai.org/cuad
2. **Convert** to Neo4j/Supabase format (use MCP tools or manual conversion)
3. **Import** into Neo4j and Supabase

**Dataset Information**:
- **Source**: CUAD v1 (Contract Understanding Atticus Dataset)
- **Size**: 510 contracts, 13,000+ clauses, 41 clause types
- **License**: CC BY 4.0
- **Website**: https://www.atticusprojectai.org/cuad

**Note**: The sample data included in this repo (5 contracts) is sufficient for testing and demos. Use the full dataset for production or research purposes.

### 4.5 Cache System (Neo4j Fallback)

The application includes a static JSON cache system for the 5 killer queries. When Neo4j is paused or unavailable (common with free-tier Neo4j Aura), the application automatically falls back to cached query results.

**How It Works**:
- Cache files are stored in `/data/cache/` directory
- Each killer query has a corresponding cache file: `query-{queryId}.json`
- When Neo4j query execution fails, the API automatically loads cached results
- UI displays a warning badge: "⚠️ Using cached data (Neo4j paused)" when cache is used

**Cache Files**: Cache files contain complete `QueryResponse` objects with query results, AI analysis, Cypher queries, and timestamps. See `/data/cache/README.md` for detailed format documentation.

**Updating Cache**: To update cache files with fresh data, ensure Neo4j is running, execute each killer query via the UI or API, and save the JSON response to `data/cache/query-{queryId}.json` with `cached: true` flag.

The cache ensures the demo works reliably even when the Neo4j free tier auto-pauses after inactivity.

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Tech Stack

- **Framework**: Next.js 16+ (App Router, React 19)
- **Language**: TypeScript 5.7+
- **Styling**: Tailwind CSS v3
- **Database**: Neo4j Aura (Graph DB)
- **Vector DB**: Supabase (PostgreSQL + pgvector)
- **AI**: OpenAI API (GPT-4o for Cypher generation and analysis)
- **Deployment**: Vercel

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
