This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Setup

Copy the example environment file and configure your credentials:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your actual credentials:
- **Supabase**: Get your project URL and keys from [Supabase Dashboard](https://supabase.com/dashboard)
- **OpenAI**: Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys)
- **Neo4j**: Get your connection URI, username, and password from your Neo4j instance (e.g., Neo4j Aura)

### 3. Data Setup

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

### 4. Run Development Server

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

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
