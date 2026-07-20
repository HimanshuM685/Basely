# Graph Report - .  (2026-07-21)

## Corpus Check
- Corpus is ~1,116 words - fits in a single context window. You may not need a graph.

## Summary
- 50 nodes · 51 edges · 13 communities (8 shown, 5 thin omitted)
- Extraction: 94% EXTRACTED · 6% INFERRED · 0% AMBIGUOUS · INFERRED: 3 edges (avg confidence: 0.92)
- Token cost: 27,927 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Core SDK Functions|Core SDK Functions]]
- [[_COMMUNITY_Package Metadata|Package Metadata]]
- [[_COMMUNITY_Error Handling & HTTP Layer|Error Handling & HTTP Layer]]
- [[_COMMUNITY_Dependencies|Dependencies]]
- [[_COMMUNITY_Repository Info|Repository Info]]
- [[_COMMUNITY_NPM Scripts|NPM Scripts]]
- [[_COMMUNITY_Base Chain Config & API Key Issue|Base Chain Config & API Key Issue]]
- [[_COMMUNITY_Contract Deployment Detection|Contract Deployment Detection]]
- [[_COMMUNITY_Transaction Counting & Catch Bug|Transaction Counting & Catch Bug]]
- [[_COMMUNITY_Bug Tracker Links|Bug Tracker Links]]
- [[_COMMUNITY_Dev Tooling (Vitest)|Dev Tooling (Vitest)]]
- [[_COMMUNITY_Basely SDK Identity|Basely SDK Identity]]
- [[_COMMUNITY_Etherscan API & Pagination|Etherscan API & Pagination]]

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
- `Basely SDK` --references--> `index.js (core implementation)`  [EXTRACTED]
  README.md → README.md  _Bridges community 11 → community 2_
- `index.js (core implementation)` --references--> `Environment configuration (ETH_API_KEY, CHAIN_ID)`  [EXTRACTED]
  README.md → README.md  _Bridges community 2 → community 6_
- `index.js (core implementation)` --references--> `Etherscan-style API (api.etherscan.io/v2)`  [EXTRACTED]
  README.md → README.md  _Bridges community 2 → community 12_
- `index.js (core implementation)` --implements--> `getContractDeploymentTransactions`  [EXTRACTED]
  README.md → README.md  _Bridges community 2 → community 7_
- `index.js (core implementation)` --implements--> `getNumberofInternalTransactions`  [EXTRACTED]
  README.md → README.md  _Bridges community 2 → community 8_

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Basely exported API surface** — readme_getnativebalance, readme_getnormaltransactionsbyaddress, readme_getnumberofinternaltransactions, readme_getnumberoftransactions, readme_getnumberofdeployedcontractsbyaddress, readme_getcontractdeploymenttransactions, readme_makegivencontractverified [EXTRACTED 1.00]
- **Etherscan API query flow (axios + env config + pagination)** — readme_axios, readme_etherscan_api, readme_env_config, readme_pagination_limit [INFERRED 0.75]

## Communities (13 total, 5 thin omitted)

### Community 1 - "Package Metadata"
Cohesion: 0.22
Nodes (8): author, description, homepage, license, main, name, type, version

### Community 2 - "Error Handling & HTTP Layer"
Cohesion: 0.33
Nodes (6): axios HTTP client, Error handling: return empty/default values, log errors, getNativeBalance, getNormalTransactionsbyAddress, index.js (core implementation), makeGivenContractVerified

### Community 3 - "Dependencies"
Cohesion: 0.67
Nodes (3): dependencies, axios, dotenv

### Community 4 - "Repository Info"
Cohesion: 0.67
Nodes (3): repository, type, url

### Community 5 - "NPM Scripts"
Cohesion: 0.67
Nodes (3): scripts, main, test

### Community 6 - "Base Chain Config & API Key Issue"
Cohesion: 0.67
Nodes (3): Base chain (chain id 8453), Environment configuration (ETH_API_KEY, CHAIN_ID), Known issue: warning says BASESCAN_API_KEY but code reads ETH_API_KEY

### Community 7 - "Contract Deployment Detection"
Cohesion: 1.00
Nodes (3): Contract creation detection (tx.to falsy), getContractDeploymentTransactions, getNumberOfDeployedContractsByAddress

### Community 8 - "Transaction Counting & Catch Bug"
Cohesion: 0.67
Nodes (3): getNumberofInternalTransactions, getNumberofTransactions, Known issue: catch blocks missing err binding

## Knowledge Gaps
- **23 isolated node(s):** `axios`, `name`, `version`, `description`, `homepage` (+18 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `index.js (core implementation)` connect `Error Handling & HTTP Layer` to `Base Chain Config & API Key Issue`, `Contract Deployment Detection`, `Transaction Counting & Catch Bug`, `Basely SDK Identity`, `Etherscan API & Pagination`?**
  _High betweenness centrality (0.121) - this node is a cross-community bridge._
- **Why does `repository` connect `Repository Info` to `Package Metadata`?**
  _High betweenness centrality (0.033) - this node is a cross-community bridge._
- **Why does `scripts` connect `NPM Scripts` to `Package Metadata`?**
  _High betweenness centrality (0.033) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `getNumberOfDeployedContractsByAddress` (e.g. with `Contract creation detection (tx.to falsy)` and `getContractDeploymentTransactions`) actually correct?**
  _`getNumberOfDeployedContractsByAddress` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `axios`, `name`, `version` to the rest of the system?**
  _25 weakly-connected nodes found - possible documentation gaps or missing edges._