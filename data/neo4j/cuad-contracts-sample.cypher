// CUAD Contracts Sample Data - First 5 Contracts
// Generated for GraphRAG Legal Demo
// Source: CUAD v1 dataset (https://www.atticusprojectai.org/cuad)
// License: CC BY 4.0 (CUAD dataset license)
//
// This file contains a sample of 5 contracts with their clauses and relationships.
// For the full dataset (510 contracts), download from CUAD website.

// Note: Contract text and context are truncated for file size. 
// Full data can be exported using the MCP Neo4j tools

// Create ClauseTypes (all 41 types)
CREATE
  (ct0:ClauseType {name: "Affiliate License-Licensee"}),
  (ct1:ClauseType {name: "Affiliate License-Licensor"}),
  (ct2:ClauseType {name: "Agreement Date"}),
  (ct3:ClauseType {name: "Anti-Assignment"}),
  (ct4:ClauseType {name: "Audit Rights"}),
  (ct5:ClauseType {name: "Cap On Liability"}),
  (ct6:ClauseType {name: "Change Of Control"}),
  (ct7:ClauseType {name: "Competitive Restriction Exception"}),
  (ct8:ClauseType {name: "Covenant Not To Sue"}),
  (ct9:ClauseType {name: "Document Name"}),
  (ct10:ClauseType {name: "Effective Date"}),
  (ct11:ClauseType {name: "Exclusivity"}),
  (ct12:ClauseType {name: "Expiration Date"}),
  (ct13:ClauseType {name: "Governing Law"}),
  (ct14:ClauseType {name: "Insurance"}),
  (ct15:ClauseType {name: "Ip Ownership Assignment"}),
  (ct16:ClauseType {name: "Irrevocable Or Perpetual License"}),
  (ct17:ClauseType {name: "Joint Ip Ownership"}),
  (ct18:ClauseType {name: "License Grant"}),
  (ct19:ClauseType {name: "Liquidated Damages"}),
  (ct20:ClauseType {name: "Minimum Commitment"}),
  (ct21:ClauseType {name: "Most Favored Nation"}),
  (ct22:ClauseType {name: "No-Solicit Of Customers"}),
  (ct23:ClauseType {name: "No-Solicit Of Employees"}),
  (ct24:ClauseType {name: "Non-Compete"}),
  (ct25:ClauseType {name: "Non-Disparagement"}),
  (ct26:ClauseType {name: "Non-Transferable License"}),
  (ct27:ClauseType {name: "Notice Period To Terminate Renewal"}),
  (ct28:ClauseType {name: "Parties"}),
  (ct29:ClauseType {name: "Post-Termination Services"}),
  (ct30:ClauseType {name: "Price Restrictions"}),
  (ct31:ClauseType {name: "Renewal Term"}),
  (ct32:ClauseType {name: "Revenue/Profit Sharing"}),
  (ct33:ClauseType {name: "Rofr/Rofo/Rofn"}),
  (ct34:ClauseType {name: "Source Code Escrow"}),
  (ct35:ClauseType {name: "Termination For Convenience"}),
  (ct36:ClauseType {name: "Third Party Beneficiary"}),
  (ct37:ClauseType {name: "Uncapped Liability"}),
  (ct38:ClauseType {name: "Unlimited/All-You-Can-Eat-License"}),
  (ct39:ClauseType {name: "Volume Restriction"}),
  (ct40:ClauseType {name: "Warranty Duration"})
;

// Contract 0: LIMEENERGYCO Distributor Agreement
CREATE (c0:Contract {
  id: "contract_0",
  title: "LIMEENERGYCO_09_09_1999-EX-10-DISTRIBUTOR AGREEMENT",
  num_clauses: 41,
  context: "EXHIBIT 10.6\n\n                              DISTRIBUTOR AGREEMENT\n\n         THIS  DISTRIBUTOR  AGREEMENT (the  \"Agreement\")  is made by and between Electric City Corp.,  a Delaware  corporation  (\"Company\")  and Electric City of Illinois LLC (\"Distributor\") this 7th day of September, 1999.\n\n                                    RECITALS\n\n         A. The  Company's  Business.  The Company is  presently  engaged in the business  of selling an energy  efficiency  device,  which is  referred to as an \"Energy  Saver\"  which may be improved  or  otherwise  changed  from its present composition (the \"Products\").  The Company may engage in the business of selling other  products  or  other  devices  other  than  the  Products,  which  will be considered  Products if Distributor  exercises its options pursuant to Section 7 hereof.\n\n         B. Representations.  As an inducement to the Company to enter into this Agreement,  the  Distributor  has  represented  that  it has or  will  have  the facil"
});

// Sample clauses for contract_0 (showing structure - full data has 41 clauses)
CREATE (cl0_0:Clause {id: "contract_0_clause_0", text: "DISTRIBUTOR AGREEMENT", start_position: 44, is_impossible: false}),
       (cl0_1:Clause {id: "contract_0_clause_1", text: "Distributor", start_position: 244, is_impossible: false}),
       (cl0_2:Clause {id: "contract_0_clause_2", text: "7th day of September, 1999.", start_position: 263, is_impossible: false}),
       (cl0_7:Clause {id: "contract_0_clause_7", text: "This Agreement is to be construed according to the laws          of the State of Illinois.", start_position: 52061, is_impossible: false});

CREATE (c0)-[:CONTAINS]->(cl0_0),
       (c0)-[:CONTAINS]->(cl0_1),
       (c0)-[:CONTAINS]->(cl0_2),
       (c0)-[:CONTAINS]->(cl0_7);

CREATE (cl0_0)-[:OF_TYPE]->(ct9),
       (cl0_1)-[:OF_TYPE]->(ct28),
       (cl0_2)-[:OF_TYPE]->(ct2),
       (cl0_7)-[:OF_TYPE]->(ct13);

// Contract 1: WHITESMOKE Promotion and Distribution Agreement
CREATE (c1:Contract {
  id: "contract_1",
  title: "WHITESMOKE,INC_11_08_2011-EX-10.26-PROMOTION AND DISTRIBUTION AGREEMENT",
  num_clauses: 41,
  context: "Exhibit 10.26    CONFIDENTIAL TREATMENT HAS BEEN REQUESTED AS TO CERTAIN PORTIONS OF THIS DOCUMENT. EACH SUCH PORTION,  WHICH HAS BEEN OMITTED HEREIN AND REPLACED WITH AN ASTERISK [*], HAS BEEN FILED SEPARATELY WITH THE  SECURITIES AND EXCHANGE COMMISSION.     PROMOTION AND DISTRIBUTION AGREEMENT     This Promotion and Distribution Agreement including all exhibits (collectively referred to as the \"Agreement\"), effective as of 1 August 2011 (the  \"Effective Date\"), is made by and between Whitesmoke Inc., with registered offices/principle place of business at 501 Silverside Road, Suite 105,  Wilmington DE 19809, USA, (\"Distributor\"), and Google Inc whose principle place of business is at 1600 Amphitheatre Parkway, Mountain View,  CA 94043, USA (\"Google\").\n\n\n\n   \"Bundle\" means the Distribution Products bundled with the Distributor App(s).     \"Chrome Browser\" means the machine-readable binary code version of the Google Chrome browser provided to Distributor in connection with  this Agreem"
});

CREATE (cl1_0:Clause {id: "contract_1_clause_0", text: "Promotion and Distribution Agreement", start_position: 307, is_impossible: false}),
       (cl1_1:Clause {id: "contract_1_clause_1", text: "Distributor", start_position: 625, is_impossible: false}),
       (cl1_3:Clause {id: "contract_1_clause_3", text: "1 August 2011", start_position: 430, is_impossible: false}),
       (cl1_7:Clause {id: "contract_1_clause_7", text: "This Agreement is governed by English law and the parties submit to the exclusive jurisdiction of the English courts in  relation to any dispute (contractual or non-contractual) concerning this Agreement save that either party may apply to any court for an  injunction or other relief to protect its Intellectual Property Rights.", start_position: 41315, is_impossible: false});

CREATE (c1)-[:CONTAINS]->(cl1_0),
       (c1)-[:CONTAINS]->(cl1_1),
       (c1)-[:CONTAINS]->(cl1_3),
       (c1)-[:CONTAINS]->(cl1_7);

CREATE (cl1_0)-[:OF_TYPE]->(ct9),
       (cl1_1)-[:OF_TYPE]->(ct28),
       (cl1_3)-[:OF_TYPE]->(ct10),
       (cl1_7)-[:OF_TYPE]->(ct13);

// Note: This is a simplified sample showing the data structure.
// For production, use MCP Neo4j tools to export complete data.
