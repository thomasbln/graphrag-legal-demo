// lib/queries/killer-queries.ts

/**
 * The 5 Killer Queries
 * 
 * Each query demonstrates a RAG limitation that GraphRAG solves.
 * These are used in the UI as selectable options.
 */

export interface KillerQuery {
  id: string
  query: string
  description: string
  ragLimitation: string
  graphragSolution: string
  category: 'negative_search' | 'multi_criteria' | 'aggregation' | 'traversal' | 'boolean_logic'
  
  // Business Context
  businessScenario: {
    persona: string
    role: string
    quote: string
    problem: string
    simpleExplanation: string  // NEU: Einfache Erklärung was gesucht wird
    simpleProblem: string      // NEU: Einfache Problem-Beschreibung
  }
  businessValue: {
    timeSaved: string
    costAvoidance?: string
    riskMitigation?: string
  }
  expectedResults: string
}

export const KILLER_QUERIES: readonly KillerQuery[] = [
  {
    id: 'negative-search',
    query: 'Contracts WITHOUT audit rights',
    description: 'Find contracts missing audit rights clauses',
    ragLimitation: 'Cannot search for absence',
    graphragSolution: 'WHERE NOT EXISTS pattern',
    category: 'negative_search',
    businessScenario: {
      persona: 'Maria',
      role: 'Compliance Director',
      quote: "We're auditing 400+ vendor contracts. I need to find which contracts are MISSING audit rights clauses. These give us the right to inspect vendor books if we suspect billing irregularities.",
      problem: 'Vector search CANNOT search for absence. Would need manual review of all 415 contracts.',
      simpleExplanation: 'Maria sucht Verträge, denen wichtige Rechte fehlen. Das ist wie eine Checkliste - sie will wissen, was NICHT drin steht.',
      simpleProblem: 'Normale Suche findet nur, was drin steht. Sie kann nicht nach "fehlt" suchen. Man müsste alle 415 Verträge manuell durchgehen.',
    },
    businessValue: {
      timeSaved: '3-4 days → 0.3 seconds',
      costAvoidance: '$300K-500K annual risk',
      riskMitigation: 'Prevents billing disputes',
    },
    expectedResults: '~240 contracts missing audit rights',
  },
  {
    id: 'multi-criteria',
    query: 'Contracts with revenue sharing AND non-compete',
    description: 'Find contracts with both clauses',
    ragLimitation: 'Returns either, not both',
    graphragSolution: 'Multi-hop traversal',
    category: 'multi_criteria',
    businessScenario: {
      persona: 'David',
      role: 'M&A Attorney',
      quote: "Analyzing acquisition target with 200+ contracts. Need to find which have BOTH revenue-sharing AND non-compete clauses. These are 'locked-in' partnerships - financially incentivized AND contractually restricted.",
      problem: 'Vector search returns documents similar to query, but cannot guarantee BOTH criteria. Must manually check all ~50 results.',
      simpleExplanation: 'David sucht Verträge, die BEIDES haben: Gewinnbeteiligung UND Wettbewerbsverbot. Das sind besonders wertvolle Partnerschaften.',
      simpleProblem: 'Normale Suche findet Verträge mit dem einen ODER dem anderen. Sie kann nicht garantieren, dass BEIDES drin steht. Man müsste alle Ergebnisse manuell prüfen.',
    },
    businessValue: {
      timeSaved: '2-3 weeks → 0.3 seconds',
      costAvoidance: '$18M locked-in revenue identified',
      riskMitigation: 'Prevents $5M+ post-acquisition defections',
    },
    expectedResults: '~12 contracts with BOTH clauses',
  },
  {
    id: 'aggregation',
    query: 'Count contracts by governing law state with clauses',
    description: 'Aggregate contracts by jurisdiction and show details',
    ragLimitation: 'Cannot aggregate',
    graphragSolution: 'Native counting + relationship traversal',
    category: 'aggregation',
    businessScenario: {
      persona: 'Jennifer',
      role: 'Chief Legal Officer',
      quote: "Preparing multi-state expansion strategy. Need to know: How many contracts are governed by California vs. New York vs. Delaware law? And show me actual contracts and their governing law clauses. This determines legal strategy and litigation venue planning ($200K+ in legal cost savings).",
      problem: 'Vector search cannot count structured categories or aggregate by state. Would need manual spreadsheet compilation. Even if found, cannot show both summary AND detailed contracts/clauses in one query.',
      simpleExplanation: 'Jennifer will wissen: Wie viele Verträge haben Kalifornien als Rechtsprechung? Und sie will die konkreten Verträge UND die Klauseln sehen. Das bestimmt die Rechtsstrategie.',
      simpleProblem: 'Normale Suche kann nicht zählen oder nach Bundesstaaten gruppieren. Sie findet nur einzelne Dokumente. Und sie kann nicht gleichzeitig eine Zusammenfassung UND die Details zeigen.',
    },
    businessValue: {
      timeSaved: '1-2 weeks → 0.3 seconds',
      costAvoidance: '$200K legal strategy planning saved',
      riskMitigation: 'Data-driven jurisdiction analysis',
    },
    expectedResults: 'New York: 78 contracts, California: 46 contracts, Delaware: 37 contracts, with actual contracts and clauses shown',
  },
  {
    id: 'traversal',
    query: 'All clauses from contracts expiring in 2025',
    description: 'Get all renewal terms from expiring contracts',
    ragLimitation: 'Loses context',
    graphragSolution: 'Follow relationships',
    category: 'traversal',
    businessScenario: {
      persona: 'Robert',
      role: 'Contract Manager',
      quote: "Building Q4 renewal pipeline. Need ALL terms from contracts expiring in 2025 - notice periods, renewal conditions, termination clauses, post-termination obligations. Miss a deadline = $500K-2M cost.",
      problem: 'Vector search can find "expiring in 2025" documents but cannot traverse to get ALL clauses from those contracts. Loses context when switching queries.',
      simpleExplanation: 'Robert braucht ALLE Bedingungen von Verträgen, die 2025 auslaufen. Er will nicht nur wissen, dass sie auslaufen, sondern auch alle Details dazu.',
      simpleProblem: 'Normale Suche findet vielleicht die Verträge, die 2025 auslaufen. Aber sie kann nicht automatisch alle Details aus diesen Verträgen holen. Man müsste jeden Vertrag einzeln durchsuchen.',
    },
    businessValue: {
      timeSaved: '1-2 weeks → 0.3 seconds',
      costAvoidance: 'Prevents missed deadlines ($500K-2M each)',
      riskMitigation: 'Proactive renewal planning',
    },
    expectedResults: '~2-5 contracts expiring in 2025 with full renewal context (varies by data)',
  },
  {
    id: 'boolean-logic',
    query: 'Revenue sharing in California OR New York',
    description: 'Complex boolean logic query',
    ragLimitation: 'Boolean logic fails',
    graphragSolution: 'Native AND/OR/NOT',
    category: 'boolean_logic',
    businessScenario: {
      persona: 'Lisa',
      role: 'Business Development VP',
      quote: "Expanding to CA and NY. Need competitive intel: Which contracts show revenue-sharing deals in these markets? This tells us what's market-standard and helps pricing strategy.",
      problem: 'Boolean logic does not map to similarity. Returns anything matching ANY term. Cannot express: (A OR B) AND (C OR D). Would need multiple queries + manual intersection.',
      simpleExplanation: 'Lisa sucht Verträge mit Gewinnbeteiligung in Kalifornien ODER New York. Sie braucht komplexe Suchkriterien.',
      simpleProblem: 'Normale Suche findet alles, was irgendwie passt. Sie kann nicht sagen: "Gewinnbeteiligung UND (Kalifornien ODER New York)". Man müsste mehrere Suchen machen und die Ergebnisse manuell kombinieren.',
    },
    businessValue: {
      timeSaved: '2-3 days → 0.3 seconds',
      costAvoidance: '$50K consultant fee saved',
      riskMitigation: 'Data-driven pricing strategy',
    },
    expectedResults: 'California: ~11 contracts, New York: ~7 contracts (18 total)',
  },
] as const

/**
 * Get query by ID
 */
export function getQueryById(id: string): KillerQuery | undefined {
  return KILLER_QUERIES.find(q => q.id === id)
}

/**
 * Get all query IDs
 */
export function getAllQueryIds(): string[] {
  return KILLER_QUERIES.map(q => q.id)
}

