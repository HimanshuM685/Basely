# Basely

Basely is a small Node.js utility that fetches on-chain account insights (transaction counts, balances, and deployed contract counts) using Etherscan-style API endpoints. It is designed as a minimal SDK to inspect wallet and contract activity for Base and other chains supported by the API.

---

## Repository layout

- [README.md](README.md) — this file  
- [package.json](package.json) — project metadata & scripts  
- [index.js](index.js) — core implementation and exports  
- [.gitignore](.gitignore) — ignored files  

---

## What this module does

- Get native balance for an address: `getNativeBalance`
- Get normal transactions for an address: `getNormalTransactionsbyAddress`
- Count internal transactions for an address: `getNumberofInternalTransactions`
- Count regular transactions for an address: `getNumberofTransactions`
- Count deployed contracts by an address: `getNumberOfDeployedContractsByAddress`
- Get contract deployment transactions: `getContractDeploymentTransactions`
- Verify contract source code: `makeGivenContractVerified`

Implementation details live in [index.js](index.js). The module uses axios to call Etherscan-style endpoints and parses the `result` array returned by the API.

---

## Quick start

1. Install dependencies:

```sh
npm install
```

2. Create a `.env` file in the project root with your API key and optional chain id.

Required environment variables (as the code currently expects):

- `ETH_API_KEY` — your API key for the Etherscan-style API
- `CHAIN_ID` — numeric chain id (optional, defaults to `8453` in code)

Example `.env` (do NOT commit your real key):

```
# .env (example)
ETH_API_KEY=your_api_key_here
# Optional override:
# CHAIN_ID=8453
```

3. Run the demo script (optional):

```sh
npm run main
```

This runs `node index.js` (see [package.json](package.json)).

---

## Usage (programmatic)

Require the exported functions and call them:

```js
// Example usage
const {
  getNativeBalance,
  getNormalTransactionsbyAddress,
  getNumberofInternalTransactions,
  getNumberofTransactions,
  getNumberOfDeployedContractsByAddress,
  getContractDeploymentTransactions,
  makeGivenContractVerified
} = require('./index.js');

(async () => {
  const address = '0xCAa6d6617690588371d3B94c692Fc3273F3e14f4';
  
  // Get native balance
  const balance = await getNativeBalance(address);
  console.log('Balance:', balance);
  
  // Get transactions
  const transactions = await getNormalTransactionsbyAddress(address);
  console.log('Transactions:', transactions.length);
  
  // Get counts
  console.log('Internal txs:', await getNumberofInternalTransactions(address));
  console.log('Total txs:', await getNumberofTransactions(address));
  console.log('Deployed contracts:', await getNumberOfDeployedContractsByAddress(address));
})();
```

## Exported Functions

- `getNativeBalance(Addr)` — async (Addr) => string — Returns native token balance for an address
- `getNormalTransactionsbyAddress(Addr)` — async (Addr) => Array — Returns array of normal transactions for an address
- `getNumberofInternalTransactions(Addr)` — async (Addr) => number — Returns count of internal transactions
- `getNumberofTransactions(Addr)` — async (Addr) => number — Returns count of regular transactions
- `getNumberOfDeployedContractsByAddress(Addr)` — async (Addr) => number — Returns count of contracts deployed by an address
- `getContractDeploymentTransactions(Addr)` — async (Addr) => Array — Returns array of contract deployment transactions
- `makeGivenContractVerified(contractAddress, sourceCode, codeFormat, contractName, compilerVersion)` — async (...) => Object — Verifies contract source code

---

## API & Implementation Notes

- **Endpoints**: Uses `https://api.etherscan.io/v2/api?...` with query parameters `module=account` and various actions (`txlist`, `txlistinternal`, `balance`, etc.)
- **Pagination**: Most requests use `page=1&offset=1000`. If an account has more than 1000 records, you may need to implement paging
- **Contract creation detection**: Transactions where `tx.to` is falsy (empty) are treated as contract creation
- **Error handling**: Functions return empty arrays or default values (0) on error, with errors logged to console
- **API response validation**: Functions check for `status === "1"` in API responses to ensure successful requests

---

## Known Issues

- Some `catch` blocks in `getNumberofInternalTransactions` and `getNumberofTransactions` use `catch { ... }` but reference `err.message` inside, which will cause a ReferenceError. These should be changed to `catch (err) { ... }`
- The warning message in `index.js` mentions `BASESCAN_API_KEY` but the code actually reads `ETH_API_KEY` from environment variables

## Scripts

- `npm run main` — run the main script at [index.js](index.js)
- `npm test` — run tests

See [package.json](package.json) for details.
