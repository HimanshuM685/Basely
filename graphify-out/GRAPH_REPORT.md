# Graph Report - .  (2026-07-22)

## Corpus Check
- Corpus is ~1,528 words - fits in a single context window. You may not need a graph.

## Summary
- 68 nodes · 68 edges · 12 communities (8 shown, 4 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 3 edges (avg confidence: 0.92)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_README SDK Docs|README SDK Docs]]
- [[_COMMUNITY_Account Module|Account Module]]
- [[_COMMUNITY_Config, Gas & Transactions|Config, Gas & Transactions]]
- [[_COMMUNITY_Package Metadata|Package Metadata]]
- [[_COMMUNITY_Contracts Module|Contracts Module]]
- [[_COMMUNITY_Dependencies|Dependencies]]
- [[_COMMUNITY_Repository Info|Repository Info]]
- [[_COMMUNITY_NPM Scripts|NPM Scripts]]
- [[_COMMUNITY_Contract Creation Detection|Contract Creation Detection]]
- [[_COMMUNITY_Bug Tracker|Bug Tracker]]
- [[_COMMUNITY_Dev Tooling (Vitest)|Dev Tooling (Vitest)]]

## God Nodes (most connected - your core abstractions)
1. `index.js (core implementation)` - 13 edges
2. `repository` - 3 edges
3. `scripts` - 3 edges
4. `getNumberOfDeployedContractsByAddress` - 3 edges
5. `getContractDeploymentTransactions` - 3 edges
6. `Environment configuration (ETH_API_KEY, CHAIN_ID)` - 3 edges
7. `bugs` - 2 edges
8. `Basely SDK` - 2 edges
9. `getNumberofInternalTransactions` - 2 edges
10. `getNumberofTransactions` - 2 edges

## Surprising Connections (you probably didn't know these)
- `index.js (core implementation)` --implements--> `getContractDeploymentTransactions`  [EXTRACTED]
  README.md → README.md  _Bridges community 0 → community 8_

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Basely exported API surface** — readme_getnativebalance, readme_getnormaltransactionsbyaddress, readme_getnumberofinternaltransactions, readme_getnumberoftransactions, readme_getnumberofdeployedcontractsbyaddress, readme_getcontractdeploymenttransactions, readme_makegivencontractverified [EXTRACTED 1.00]
- **Etherscan API query flow (axios + env config + pagination)** — readme_axios, readme_etherscan_api, readme_env_config, readme_pagination_limit [INFERRED 0.75]

## Communities (12 total, 4 thin omitted)

### Community 0 - "README SDK Docs"
Cohesion: 0.14
Nodes (16): axios HTTP client, Base chain (chain id 8453), Basely SDK, Environment configuration (ETH_API_KEY, CHAIN_ID), Error handling: return empty/default values, log errors, Etherscan-style API (api.etherscan.io/v2), getNativeBalance, getNormalTransactionsbyAddress (+8 more)

### Community 2 - "Config, Gas & Transactions"
Cohesion: 0.22
Nodes (4): axios, { CHAIN_ID, APIKEY }, axios, { CHAIN_ID, APIKEY }

### Community 3 - "Package Metadata"
Cohesion: 0.22
Nodes (8): author, description, homepage, license, main, name, type, version

### Community 5 - "Dependencies"
Cohesion: 0.67
Nodes (3): dependencies, axios, dotenv

### Community 6 - "Repository Info"
Cohesion: 0.67
Nodes (3): repository, type, url

### Community 7 - "NPM Scripts"
Cohesion: 0.67
Nodes (3): scripts, main, test

### Community 8 - "Contract Creation Detection"
Cohesion: 1.00
Nodes (3): Contract creation detection (tx.to falsy), getContractDeploymentTransactions, getNumberOfDeployedContractsByAddress

## Knowledge Gaps
- **30 isolated node(s):** `axios`, `{ CHAIN_ID, APIKEY }`, `axios`, `{ CHAIN_ID, APIKEY }`, `axios` (+25 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `index.js (core implementation)` connect `README SDK Docs` to `Contract Creation Detection`?**
  _High betweenness centrality (0.064) - this node is a cross-community bridge._
- **Why does `repository` connect `Repository Info` to `Package Metadata`?**
  _High betweenness centrality (0.018) - this node is a cross-community bridge._
- **Why does `scripts` connect `NPM Scripts` to `Package Metadata`?**
  _High betweenness centrality (0.018) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `getNumberOfDeployedContractsByAddress` (e.g. with `Contract creation detection (tx.to falsy)` and `getContractDeploymentTransactions`) actually correct?**
  _`getNumberOfDeployedContractsByAddress` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `axios`, `{ CHAIN_ID, APIKEY }`, `axios` to the rest of the system?**
  _32 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `README SDK Docs` be split into smaller, more focused modules?**
  _Cohesion score 0.14166666666666666 - nodes in this community are weakly interconnected._