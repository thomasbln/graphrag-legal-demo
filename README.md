# GraphRAG Legal AI Demo

This repository contains a demonstration of GraphRAG (Graph Retrieval-Augmented Generation) applied to legal contract analysis. It showcases how Knowledge Graphs solve logical limitations inherent in standard Vector-based RAG systems.

[Article on Medium](https://medium.com/p/01436abfe095) · [Live Demo](https://graphrag-legal-demo-private.vercel.app/)

## The Problem: Semantic Similarity vs. Logical Precision

Most RAG applications rely on vector embeddings to find "similar" text. While effective for summaries, this approach fails on structured or negative queries:

- **Negative Search:** Vectors cannot represent the absence of a relationship (e.g., "Find contracts without audit rights").
- **Boolean Logic:** Similarity search struggles with strict AND/OR conditions across document attributes.
- **Structural Integrity:** Standard RAG treats documents as disconnected fragments, losing the hierarchical context of legal clauses.

## Architecture

The system uses a 3-layer GraphRAG pattern to ensure 100% logical reliability:

1. **Translation Layer:** GPT-4 translates natural language input into a precise Cypher query.
2. **Retrieval Layer:** Neo4j executes the query against a structured Knowledge Graph.
3. **Analysis Layer:** GPT-4 synthesizes the retrieved facts into a professional legal response.

**Tech Stack:** Next.js, Neo4j, OpenAI GPT-4.

## Dataset

The demo is powered by the [Atticus Project CUAD](https://www.atticusprojectai.org/cuad) (Contract Understanding Atticus Dataset):

- 415 commercial contracts with 13,000+ expert-annotated clauses.
- More information: [atticusprojectai.org/cuad](https://www.atticusprojectai.org/cuad)
- **Schema:** `(Contract)-[:CONTAINS]->(Clause)-[:OF_TYPE]->(ClauseType)`.

## Local Development

### Prerequisites

- Node.js (Next.js environment)
- Neo4j Database (Aura or local)
- OpenAI API Key

### Installation

**Clone the repository:**

```bash
git clone https://github.com/thomasbln/graphrag-legal-demo.git
cd graphrag-legal-demo
```

**Install dependencies:**

```bash
npm install
```

**Configure environment:** Create a `.env` file based on `.env.example` with your `OPENAI_API_KEY` and Neo4j credentials.

**Start the development server:**

```bash
npm run dev
```

## License

MIT

---

*crafted by thomas @ awareo.io*
