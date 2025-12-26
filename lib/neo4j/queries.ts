// lib/neo4j/queries.ts

import type { QueryResult, Contract, Clause, ClauseType } from "@/lib/types";

/**
 * Execute query and transform to QueryResult format
 *
 * This function will be called from API routes.
 * It uses MCP tools which are available in Cursor.
 */
export async function executeQuery(cypher: string): Promise<QueryResult> {
  const startTime = Date.now();

  // Note: In the API route, we'll call MCP tools directly
  // This function signature is for type safety and structure

  // Placeholder - actual implementation in API route
  return {
    cypher,
    executionTime: 0,
    contracts: [],
    clauses: [],
    aggregations: {},
    rawResults: [],
  };
}

/**
 * Transform MCP result array to QueryResult
 */
export function transformResults(
  cypher: string,
  executionTime: number,
  mcpResults: any[]
): QueryResult {
  if (mcpResults.length === 0) {
    return {
      cypher,
      executionTime,
      contracts: [],
      clauses: [],
      aggregations: {},
      rawResults: [],
    };
  }

  // Check if result is aggregation (single row with count/sum/etc OR multiple rows with GROUP BY)
  const firstResult = mcpResults[0];
  const isAggregation = Object.keys(firstResult).some(
    (key) =>
      key.includes("count") ||
      key.includes("total") ||
      key.includes("sum") ||
      key.includes("pct") ||
      key.includes("percentage")
  );

  // Check if result contains clauses (various field names)
  // Support both formats: cl1.text and cl1_text (with underscore)
  const hasClauses = mcpResults.some(
    (r) =>
      r["cl.id"] ||
      r["cl.text"] ||
      r["cl_id"] ||
      r["cl_text"] ||
      r["clause.id"] ||
      r["clause.text"] ||
      r["clause_id"] ||
      r["clause_text"] ||
      r["cl1.id"] ||
      r["cl1.text"] ||
      r["cl1_id"] ||
      r["cl1_text"] ||
      r["cl2.id"] ||
      r["cl2.text"] ||
      r["cl2_id"] ||
      r["cl2_text"] ||
      r["revenue_clause"] ||
      r["noncompete_clause"] ||
      r["revenue_terms"] ||
      r["renewal_terms"] ||
      r["clause_type"] ||
      r["clauseType.name"] ||
      r["ct.name"] ||
      r["ct1.name"] ||
      r["ct2.name"] ||
      r["ct_name"] ||
      r["ct1_name"] ||
      r["ct2_name"] ||
      r["clause_type"] ||
      r["cl1_type"] ||
      r["cl2_type"]
  );

  // Special case: Aggregation WITH clauses (e.g., "Count by state with details")
  if (isAggregation && hasClauses) {
    // Process clauses and contracts first
    const contractMap = new Map<
      string,
      {
        contract: Contract;
        clauses: Array<{ clause: Clause; clauseType: ClauseType }>;
      }
    >();

    mcpResults.forEach((r) => {
      const contractId = r["c.id"] || r["contract.id"] || "";
      const contractTitle = r["c.title"] || r["contract.title"] || "";

      if (!contractId && !contractTitle) return;

      const key = contractId || contractTitle;
      if (!contractMap.has(key)) {
        contractMap.set(key, {
          contract: {
            id: contractId,
            title: contractTitle,
            num_clauses: r["c.num_clauses"] || r["contract.num_clauses"] || 0,
            context: r["c.context"] || r["contract.context"] || "",
          },
          clauses: [],
        });
      }

      const entry = contractMap.get(key)!;

      // Add clauses
      if (r["cl.id"] || r["cl.text"] || r["cl_id"] || r["cl_text"]) {
        const clauseId =
          r["cl.id"] || r["cl_id"] || r["clause.id"] || r["clause_id"] || "";
        const clauseText =
          r["cl.text"] ||
          r["cl_text"] ||
          r["clause.text"] ||
          r["clause_text"] ||
          "";
        const clauseTypeName =
          r["ct.name"] ||
          r["ct_name"] ||
          r["clauseType.name"] ||
          r["clause_type"] ||
          "";

        if (clauseText && clauseTypeName) {
          const exists = entry.clauses.some(
            (c) =>
              c.clause.id === clauseId ||
              (c.clause.text === clauseText &&
                c.clauseType.name === clauseTypeName)
          );

          if (!exists) {
            entry.clauses.push({
              clause: {
                id: clauseId,
                text: clauseText,
                start_position:
                  r["cl.start_position"] || r["clause.start_position"] || 0,
                is_impossible:
                  r["cl.is_impossible"] || r["clause.is_impossible"] || false,
              },
              clauseType: {
                name: clauseTypeName,
              },
            });
          }
        }
      }
    });

    // Convert to QueryResult format
    const contracts: Contract[] = [];
    const clauses: Array<{
      clause: Clause;
      clauseType: ClauseType;
      contract: Contract;
    }> = [];

    contractMap.forEach(({ contract, clauses: contractClauses }) => {
      contracts.push(contract);
      contractClauses.forEach(({ clause, clauseType }) => {
        clauses.push({ clause, clauseType, contract });
      });
    });

    // Also extract aggregations (GROUP BY style - multiple rows with state/category)
    if (mcpResults.length > 1) {
      const aggregationRows: Record<string, any>[] = [];
      const seenCategories = new Set<string>();

      mcpResults.forEach((row) => {
        // Find category/state field
        const categoryKey = Object.keys(row).find(
          (k) =>
            (k.includes("state") ||
              k.includes("category") ||
              k.includes("type")) &&
            !k.includes("count") &&
            !k.includes("clause")
        );
        const countKey = Object.keys(row).find(
          (k) => k.includes("count") || k.includes("total") || k.includes("sum")
        );

        if (categoryKey && countKey && !seenCategories.has(row[categoryKey])) {
          seenCategories.add(row[categoryKey]);
          aggregationRows.push({
            [categoryKey]: row[categoryKey],
            [countKey]: row[countKey],
          });
        }
      });

      const combined: Record<string, any> = {
        _aggregationRows:
          aggregationRows.length > 0 ? aggregationRows : mcpResults,
      };

      return {
        cypher,
        executionTime,
        contracts,
        clauses,
        aggregations: combined,
        rawResults: mcpResults,
      };
    }

    // Single row aggregation with clauses
    return {
      cypher,
      executionTime,
      contracts,
      clauses,
      aggregations: firstResult,
      rawResults: mcpResults,
    };
  }

  // Pure aggregation (no clauses)
  if (isAggregation) {
    if (mcpResults.length === 1) {
      return {
        cypher,
        executionTime,
        aggregations: firstResult,
        rawResults: mcpResults,
      };
    } else {
      const combined: Record<string, any> = {
        ...firstResult,
        _aggregationRows: mcpResults,
      };

      return {
        cypher,
        executionTime,
        aggregations: combined,
        rawResults: mcpResults,
      };
    }
  }

  // Pure clauses (no aggregation)
  if (hasClauses) {
    // Group by contract
    const contractMap = new Map<
      string,
      {
        contract: Contract;
        clauses: Array<{ clause: Clause; clauseType: ClauseType }>;
      }
    >();

    mcpResults.forEach((r) => {
      const contractId = r["c.id"] || r["contract.id"] || "";
      const contractTitle = r["c.title"] || r["contract.title"] || "";

      // Skip if no contract identifier
      if (!contractId && !contractTitle) return;

      // Create or get contract entry
      const key = contractId || contractTitle;
      if (!contractMap.has(key)) {
        contractMap.set(key, {
          contract: {
            id: contractId,
            title: contractTitle,
            num_clauses: r["c.num_clauses"] || r["contract.num_clauses"] || 0,
            context: r["c.context"] || r["contract.context"] || "",
          },
          clauses: [],
        });
      }

      const entry = contractMap.get(key)!;

      // Format 1: Standard clause format (cl.id, cl.text, ct.name or cl_id, cl_text, ct_name)
      if (r["cl.id"] || r["cl.text"] || r["cl_id"] || r["cl_text"]) {
        const clauseId =
          r["cl.id"] || r["cl_id"] || r["clause.id"] || r["clause_id"] || "";
        const clauseText =
          r["cl.text"] ||
          r["cl_text"] ||
          r["clause.text"] ||
          r["clause_text"] ||
          "";
        const clauseTypeName =
          r["ct.name"] ||
          r["ct_name"] ||
          r["clauseType.name"] ||
          r["clause_type"] ||
          "";

        if (clauseText && clauseTypeName) {
          // Check if this clause already exists (avoid duplicates)
          const exists = entry.clauses.some(
            (c) =>
              c.clause.id === clauseId ||
              (c.clause.text === clauseText &&
                c.clauseType.name === clauseTypeName)
          );

          if (!exists) {
            entry.clauses.push({
              clause: {
                id: clauseId,
                text: clauseText,
                start_position:
                  r["cl.start_position"] || r["clause.start_position"] || 0,
                is_impossible:
                  r["cl.is_impossible"] || r["clause.is_impossible"] || false,
              },
              clauseType: {
                name: clauseTypeName,
              },
            });
          }
        }
      }

      // Format 2: Multi-criteria format (cl1.text, cl2.text or cl1_text, cl2_text)
      if (r["cl1.text"] || r["cl1_text"] || r["revenue_clause"]) {
        const clauseText =
          r["cl1.text"] || r["cl1_text"] || r["revenue_clause"] || "";
        const clauseTypeName =
          r["ct1.name"] ||
          r["ct1_name"] ||
          r["cl1_type"] ||
          "Revenue/Profit Sharing";

        if (clauseText) {
          const exists = entry.clauses.some(
            (c) =>
              c.clause.text === clauseText &&
              c.clauseType.name === clauseTypeName
          );

          if (!exists) {
            entry.clauses.push({
              clause: {
                id: r["cl1.id"] || r["cl1_id"] || "",
                text: clauseText,
                start_position: 0,
                is_impossible: false,
              },
              clauseType: {
                name: clauseTypeName,
              },
            });
          }
        }
      }

      if (r["cl2.text"] || r["cl2_text"] || r["noncompete_clause"]) {
        const clauseText =
          r["cl2.text"] || r["cl2_text"] || r["noncompete_clause"] || "";
        const clauseTypeName =
          r["ct2.name"] || r["ct2_name"] || r["cl2_type"] || "Non-Compete";

        if (clauseText) {
          const exists = entry.clauses.some(
            (c) =>
              c.clause.text === clauseText &&
              c.clauseType.name === clauseTypeName
          );

          if (!exists) {
            entry.clauses.push({
              clause: {
                id: r["cl2.id"] || r["cl2_id"] || "",
                text: clauseText,
                start_position: 0,
                is_impossible: false,
              },
              clauseType: {
                name: clauseTypeName,
              },
            });
          }
        }
      }

      // Format 3: Boolean logic (revenue_terms, governing_law)
      if (r["revenue_terms"]) {
        const clauseText = r["revenue_terms"] || "";
        if (clauseText) {
          const exists = entry.clauses.some(
            (c) =>
              c.clause.text === clauseText &&
              c.clauseType.name === "Revenue/Profit Sharing"
          );

          if (!exists) {
            entry.clauses.push({
              clause: {
                id: "",
                text: clauseText,
                start_position: 0,
                is_impossible: false,
              },
              clauseType: {
                name: "Revenue/Profit Sharing",
              },
            });
          }
        }
      }

      if (r["governing_law"]) {
        const clauseText = r["governing_law"] || "";
        if (clauseText) {
          const exists = entry.clauses.some(
            (c) =>
              c.clause.text === clauseText &&
              c.clauseType.name === "Governing Law"
          );

          if (!exists) {
            entry.clauses.push({
              clause: {
                id: "",
                text: clauseText,
                start_position: 0,
                is_impossible: false,
              },
              clauseType: {
                name: "Governing Law",
              },
            });
          }
        }
      }

      // Format 4: Traversal format (renewal_terms as array)
      if (r["renewal_terms"] && Array.isArray(r["renewal_terms"])) {
        r["renewal_terms"].forEach((term: any) => {
          const clauseText = term.terms || term.text || "";
          const clauseTypeName = term.clause_type || term.type || "";

          if (clauseText && clauseTypeName) {
            const exists = entry.clauses.some(
              (c) =>
                c.clause.text === clauseText &&
                c.clauseType.name === clauseTypeName
            );

            if (!exists) {
              entry.clauses.push({
                clause: {
                  id: "",
                  text: clauseText,
                  start_position: 0,
                  is_impossible: false,
                },
                clauseType: {
                  name: clauseTypeName,
                },
              });
            }
          }
        });
      }
    });

    // Convert to QueryResult format
    const contracts: Contract[] = [];
    const clauses: Array<{
      clause: Clause;
      clauseType: ClauseType;
      contract: Contract;
    }> = [];

    contractMap.forEach(({ contract, clauses: contractClauses }) => {
      contracts.push(contract);
      contractClauses.forEach(({ clause, clauseType }) => {
        clauses.push({ clause, clauseType, contract });
      });
    });

    return {
      cypher,
      executionTime,
      contracts,
      clauses,
      rawResults: mcpResults,
    };
  }

  // Check if result contains contracts (without clauses)
  const hasContracts = mcpResults.some(
    (r) => r["c.id"] || r["c.title"] || r["contract.id"] || r["contract.title"]
  );

  if (hasContracts) {
    const contracts: Contract[] = [];
    const seenIds = new Set<string>();

    mcpResults.forEach((r) => {
      const contractId = r["c.id"] || r["contract.id"] || "";
      const contractTitle = r["c.title"] || r["contract.title"] || "";

      if (!contractId && !contractTitle) return;

      const key = contractId || contractTitle;
      if (!seenIds.has(key)) {
        seenIds.add(key);
        contracts.push({
          id: contractId,
          title: contractTitle,
          num_clauses: r["c.num_clauses"] || r["contract.num_clauses"] || 0,
          context: r["c.context"] || r["contract.context"] || "",
        });
      }
    });

    return {
      cypher,
      executionTime,
      contracts,
      rawResults: mcpResults,
    };
  }

  // Default: return raw results
  return {
    cypher,
    executionTime,
    rawResults: mcpResults,
  };
}
