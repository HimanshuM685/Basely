# Basely

Basely is a small Node.js utility that fetches on-chain account insights (transaction counts and deployed contract counts) using Etherscan-style API endpoints. It is designed as a minimal SDK to inspect wallet and contract activity for Base and other chains supported by the API.

---

## Repository layout

- [README.md](README.md) — this file  
- [package.json](package.json) — project metadata & scripts  
- [.env](.env) — environment variables (local only; do not commit secrets)  
- [.gitignore](.gitignore) — ignored files  
- [src/index.js](src/index.js) — core implementation and exports: [`getNumberofInternalTransactions`](src/index.js), [`getNumberofTransactions`](src/index.js), [`getNumberOfDeployedContractsByAddress`](src/index.js)

---

## What this module does

- Count internal transactions for an address: [`getNumberofInternalTransactions`](src/index.js)  
- Count regular transactions for an address: [`getNumberofTransactions`](src/index.js)  
- Count deployed contracts by an address (transactions where `to` is empty): [`getNumberOfDeployedContractsByAddress`](src/index.js)

Implementation details live in [src/index.js](src/index.js). The module uses axios to call Etherscan-style endpoints and parses the `result` array returned by the API.

---

## Quick start

1. Install dependencies:

```sh
npm install
```

2. Create a `.env` file in the project root with your API key and optional chain id.

Required environment variables (as the code currently expects):

- `BASE_SEPHOLIA_API_KEY` — your API key for the Etherscan-style API
- `CHAIN_ID` — numeric chain id (optional, defaults to `8453` in code)

Example `.env` (do NOT commit your real key):

```
# .env (example)
BASE_SEPHOLIA_API_KEY=your_api_key_here
# Optional override:
# CHAIN_ID=8453
```

Note: The repository contains an existing `.env` file with different variable names. See "Inconsistencies & suggested fixes" below.

3. Run the demo script:

```sh
npm run main
```

This runs `node ./src/index.js` (see [package.json](package.json)) and prints counts for a hard-coded test address inside [src/index.js](src/index.js).

---

## Usage (programmatic)

Require the exported functions and call them:

```js
// Example usage
const {
  getNumberofInternalTransactions,
  getNumberofTransactions,
  getNumberOfDeployedContractsByAddress
} = require('./src/index.js');

(async () => {
  const address = '0xCAa6d6617690588371d3B94c692Fc3273F3e14f4';
  console.log('Internal:', await getNumberofInternalTransactions(address));
  console.log('Txs:', await getNumberofTransactions(address));
  console.log('Deployed contracts:', await getNumberOfDeployedContractsByAddress(address));
})();
```

Exports:
- [`getNumberofInternalTransactions`](src/index.js) — async (Addr) => number
- [`getNumberofTransactions`](src/index.js) — async (Addr) => number
- [`getNumberOfDeployedContractsByAddress`](src/index.js) — async (Addr) => number

---

## API & implementation notes

- Endpoints used: `https://api.etherscan.io/v2/api?...` with query parameters `module=account` and `action=txlist` / `txlistinternal`. Results parsed from the `result` field.
- Pagination: current requests use `page=1&offset=1000`. If an account has more than 1000 records you must implement paging.
- Contract creation detection: transactions where `tx.to` is falsy (no `to`) are treated as contract creation.

---

## Inconsistencies found in the workspace

- Environment variable mismatch:
  - [src/index.js](src/index.js) expects `BASE_SEPHOLIA_API_KEY` but the sample `.env` in the repo uses `ETH_API_KEY`. See [.env](.env).
  - The startup warning in [src/index.js](src/index.js) prints `BASESCAN_API_KEY` which is inconsistent with the used `BASE_SEPHOLIA_API_KEY`.
  - Recommended: unify on a single env var (e.g., `BASE_SEPHOLIA_API_KEY`) and update `.env` and warning text accordingly.

- CHAIN_ID mismatch:
  - [src/index.js](src/index.js) defaults `CHAIN_ID` to `8453`.
  - The repo `.env` contains `CHAIN_ID=84532` (likely a typo). Verify the intended chain id.

- Error handling:
  - Two `catch` blocks in [src/index.js](src/index.js) use `catch { ... }` but attempt to read `err.message` inside — this will cause a ReferenceError. Change to `catch (err) { ... }`.

- Demo code in module:
  - [src/index.js](src/index.js) contains immediate-invoked async functions that run on module load. For library usage, remove demo invocations and provide a separate script (e.g., `scripts/demo.js`) or gate them behind a CLI flag.

---

## Suggested fixes (high priority)

1. Update [src/index.js](src/index.js) `catch` blocks to `catch (err) { ... }` so error logging works. Example change:
   - function [`getNumberofInternalTransactions`](src/index.js) and [`getNumberofTransactions`](src/index.js): replace `catch { console.error("Error fetching transactions:", err.message); }` with `catch (err) { console.error("Error fetching transactions:", err.message); }`.

2. Unify environment variable naming:
   - Either change [src/index.js](src/index.js) to read `process.env.ETH_API_KEY` (if you prefer current `.env`) or change `.env` to set `BASE_SEPHOLIA_API_KEY`. Update the warning text accordingly.

3. Remove or isolate demo/test invocations in [src/index.js](src/index.js). Export-only modules should not run side effects on require.

4. Add pagination and rate-limit handling for accounts with many transactions.

---

## Scripts

- `npm run main` — run the demo at [src/index.js](src/index.js)

See [package.json](package.json) for details.

---
