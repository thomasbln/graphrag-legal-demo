-- CUAD Contracts Sample Data - First 5 Contracts
-- Generated for GraphRAG Legal Demo
-- Source: CUAD v1 dataset (https://www.atticusprojectai.org/cuad)
-- License: CC BY 4.0 (CUAD dataset license)
--
-- This file contains a sample of 5 contracts with their clauses.
-- For the full dataset (510 contracts), download from CUAD website.

-- Note: Embeddings are not included in this sample. Generate them using OpenAI API
-- after importing the data. See README.md for instructions.

-- 1. Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- 2. Contracts Table
CREATE TABLE IF NOT EXISTS contracts (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  text TEXT,
  num_clauses INTEGER,
  context TEXT,
  embedding vector(1536),
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

-- 4. Indexes for Vector Search
CREATE INDEX IF NOT EXISTS contracts_embedding_idx 
ON contracts USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);

CREATE INDEX IF NOT EXISTS clauses_embedding_idx 
ON clauses USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);

-- 5. Indexes for normal queries
CREATE INDEX IF NOT EXISTS clauses_contract_id_idx ON clauses(contract_id);
CREATE INDEX IF NOT EXISTS clauses_clause_type_idx ON clauses(clause_type);

-- 6. Vector Search Function
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

-- 7. Sample Data: Contracts
INSERT INTO contracts (id, title, text, num_clauses, context) VALUES
('contract_0', 
 'LIMEENERGYCO_09_09_1999-EX-10-DISTRIBUTOR AGREEMENT',
 '[Document Name]: DISTRIBUTOR AGREEMENT

[Parties]: Distributor

[Agreement Date]: 7th day of September, 1999.

[Governing Law]: This Agreement is to be construed according to the laws of the State of Illinois.',
 41,
 'EXHIBIT 10.6

                              DISTRIBUTOR AGREEMENT

         THIS  DISTRIBUTOR  AGREEMENT (the  "Agreement")  is made by and between Electric City Corp.,  a Delaware  corporation  ("Company")  and Electric City of Illinois LLC ("Distributor") this 7th day of September, 1999.

                                    RECITALS

         A. The  Company''s  Business.  The Company is  presently  engaged in the business  of selling an energy  efficiency  device,  which is  referred to as an "Energy  Saver"  which may be improved  or  otherwise  changed  from its present composition (the "Products").  The Company may engage in the business of selling other  products  or  other  devices  other  than  the  Products,  which  will be considered  Products if Distributor  exercises its options pursuant to Section 7 hereof.

         B. Representations.  As an inducement to the Company to enter into this Agreement,  the  Distributor  has  represented  that  it has or  will  have  the facil'),

('contract_1',
 'WHITESMOKE,INC_11_08_2011-EX-10.26-PROMOTION AND DISTRIBUTION AGREEMENT',
 '[Document Name]: Promotion and Distribution Agreement

[Parties]: Distributor

[Effective Date]: 1 August 2011

[Governing Law]: This Agreement is governed by English law and the parties submit to the exclusive jurisdiction of the English courts in  relation to any dispute (contractual or non-contractual) concerning this Agreement save that either party may apply to any court for an  injunction or other relief to protect its Intellectual Property Rights.',
 41,
 'Exhibit 10.26    CONFIDENTIAL TREATMENT HAS BEEN REQUESTED AS TO CERTAIN PORTIONS OF THIS DOCUMENT. EACH SUCH PORTION,  WHICH HAS BEEN OMITTED HEREIN AND REPLACED WITH AN ASTERISK [*], HAS BEEN FILED SEPARATELY WITH THE  SECURITIES AND EXCHANGE COMMISSION.     PROMOTION AND DISTRIBUTION AGREEMENT     This Promotion and Distribution Agreement including all exhibits (collectively referred to as the "Agreement"), effective as of 1 August 2011 (the  "Effective Date"), is made by and between Whitesmoke Inc., with registered offices/principle place of business at 501 Silverside Road, Suite 105,  Wilmington DE 19809, USA, ("Distributor"), and Google Inc whose principle place of business is at 1600 Amphitheatre Parkway, Mountain View,  CA 94043, USA ("Google").


   "Bundle" means the Distribution Products bundled with the Distributor App(s).     "Chrome Browser" means the machine-readable binary code version of the Google Chrome browser provided to Distributor in connection with  this Agreem');

-- 8. Sample Data: Clauses
INSERT INTO clauses (id, contract_id, text, clause_type, start_position) VALUES
('contract_0_clause_0', 'contract_0', 'DISTRIBUTOR AGREEMENT', 'Document Name', 44),
('contract_0_clause_1', 'contract_0', 'Distributor', 'Parties', 244),
('contract_0_clause_2', 'contract_0', '7th day of September, 1999.', 'Agreement Date', 263),
('contract_0_clause_7', 'contract_0', 'This Agreement is to be construed according to the laws          of the State of Illinois.', 'Governing Law', 52061),

('contract_1_clause_0', 'contract_1', 'Promotion and Distribution Agreement', 'Document Name', 307),
('contract_1_clause_1', 'contract_1', 'Distributor', 'Parties', 625),
('contract_1_clause_3', 'contract_1', '1 August 2011', 'Effective Date', 430),
('contract_1_clause_7', 'contract_1', 'This Agreement is governed by English law and the parties submit to the exclusive jurisdiction of the English courts in  relation to any dispute (contractual or non-contractual) concerning this Agreement save that either party may apply to any court for an  injunction or other relief to protect its Intellectual Property Rights.', 'Governing Law', 41315);

-- Note: This is a simplified sample showing the data structure.
-- For full data export, use MCP Supabase tools or query Supabase directly.
-- Embeddings need to be generated separately using OpenAI API after import.
-- See README.md for complete instructions.

