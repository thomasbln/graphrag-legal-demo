-- Supabase Schema for RAG Vector Search
-- Run this in Supabase SQL Editor

-- 1. pgvector Extension aktivieren
CREATE EXTENSION IF NOT EXISTS vector;

-- 2. Contracts Table
CREATE TABLE IF NOT EXISTS contracts (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  text TEXT, -- Full contract text (alle Clauses kombiniert)
  num_clauses INTEGER,
  context TEXT,
  embedding vector(1536), -- OpenAI text-embedding-3-small
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Clauses Table
CREATE TABLE IF NOT EXISTS clauses (
  id TEXT PRIMARY KEY,
  contract_id TEXT REFERENCES contracts(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  clause_type TEXT,
  start_position INTEGER,
  embedding vector(1536),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Indexes für Vector Search
CREATE INDEX IF NOT EXISTS contracts_embedding_idx 
ON contracts USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);

CREATE INDEX IF NOT EXISTS clauses_embedding_idx 
ON clauses USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);

-- 5. Indexes für normale Queries
CREATE INDEX IF NOT EXISTS clauses_contract_id_idx ON clauses(contract_id);
CREATE INDEX IF NOT EXISTS clauses_clause_type_idx ON clauses(clause_type);

-- 6. Vector Search Function (optional, für bessere Performance)
CREATE OR REPLACE FUNCTION match_contracts(
  query_embedding vector(1536),
  match_threshold float DEFAULT 0.7,
  match_count int DEFAULT 10
)
RETURNS TABLE (
  id text,
  title text,
  text text,
  num_clauses integer,
  context text,
  similarity float
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    contracts.id,
    contracts.title,
    contracts.text,
    contracts.num_clauses,
    contracts.context,
    1 - (contracts.embedding <=> query_embedding) as similarity
  FROM contracts
  WHERE 1 - (contracts.embedding <=> query_embedding) > match_threshold
  ORDER BY contracts.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;
