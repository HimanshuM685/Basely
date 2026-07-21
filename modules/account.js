const axios = require("axios");
const { CHAIN_ID, APIKEY } = require("./config");

// Account Funtions
async function getNativeBalance(Addr){
  const NativeBalance = await axios.get(`https://api.etherscan.io/v2/api?apikey=${APIKEY}&chainid=${CHAIN_ID}&module=account&action=balance&address=${Addr}&tag=latest`)

  return NativeBalance.data?.result;
}

async function getNativeBalanceMulti(Addrs) {
  try {
    const list = Array.isArray(Addrs) ? Addrs.join(",") : Addrs; // max 20 addresses per call
    const res = await axios.get(`https://api.etherscan.io/v2/api?apikey=${APIKEY}&chainid=${CHAIN_ID}&module=account&action=balancemulti&address=${list}&tag=latest`);

    if (res.data?.status !== "1") {
      console.error(`API Error: ${res.data?.result || res.data?.message || "Unknown error"}`);
      return [];
    }

    return Array.isArray(res.data.result) ? res.data.result : []; // [{account, balance}]
  } catch (err) {
    console.error("Error fetching multi balances:", err?.message || err);
    return [];
  }
}

// PRO endpoint (Standard plan+), throttled 2 calls/sec
async function getHistoricalNativeBalance(Addr, blockNo) {
  try {
    const res = await axios.get(`https://api.etherscan.io/v2/api?apikey=${APIKEY}&chainid=${CHAIN_ID}&module=account&action=balancehistory&address=${Addr}&blockno=${blockNo}`);

    if (res.data?.status !== "1") {
      console.error(`API Error: ${res.data?.result || res.data?.message || "Unknown error"}`);
      return null;
    }

    return res.data.result; // balance in wei at blockNo
  } catch (err) {
    console.error("Error fetching historical balance:", err?.message || err);
    return null;
  }
}

// PRO endpoint (Standard plan+), throttled 2 calls/sec. EOA only, not contracts.
async function getAddressFundedBy(Addr) {
  try {
    const res = await axios.get(`https://api.etherscan.io/v2/api?apikey=${APIKEY}&chainid=${CHAIN_ID}&module=account&action=fundedby&address=${Addr}`);

    if (res.data?.status !== "1") {
      console.error(`API Error: ${res.data?.result || res.data?.message || "Unknown error"}`);
      return null;
    }

    return res.data.result; // {block, timeStamp, fundingAddress, fundingTxn, value}
  } catch (err) {
    console.error("Error fetching funded-by info:", err?.message || err);
    return null;
  }
}

async function getNormalTransactionsbyAddress(Addr){
  try{
    const Tnx = await axios.get(`https://api.etherscan.io/v2/api?apikey=${APIKEY}&chainid=${CHAIN_ID}&module=account&action=txlist&address=${Addr}&startblock=0&endblock=latest&page=1&offset=1000&sort=desc`);

    // Check if API returned an error status
    if (Tnx.data?.status !== "1") {
      console.error(`API Error: ${Tnx.data?.message || "Unknown error"}`);
      return [];
    }

    // Ensure result is an array
    const result = Tnx.data?.result;
    if (!result) {
      return [];
    }

    // Handle case where result might be a string error message instead of array
    if (typeof result === "string") {
      console.error(`API returned error message: ${result}`);
      return [];
    }

    return Array.isArray(result) ? result : [];
  }catch(err){
    console.error("Error fetching normal transactions:", err?.message || err);
    return [];
  }
}

async function getNumberofInternalTransactions(Addr) {
    try{
        const internalTransactionCount = await axios.get(`https://api.etherscan.io/v2/api?chainid=${CHAIN_ID}&module=account&action=txlistinternal&apikey=${APIKEY}&startblock=0&endblock=latest&page=1&offset=1000&sort=desc&address=${Addr}`);

        return internalTransactionCount.data["result"].length;
    }catch(err){
        console.error("Error fetching transactions:", err.message);
        return 0;
    }
}

async function getNumberofTransactions(Addr) {
    try{
        const internalTransactionCount = await axios.get(`https://api.etherscan.io/v2/api?chainid=${CHAIN_ID}&module=account&action=txlist&apikey=${APIKEY}&startblock=0&endblock=latest&page=1&offset=1000&sort=desc&address=${Addr}`);

        return internalTransactionCount.data["result"].length;
    }catch(err){
        console.error("Error fetching transactions:", err.message);
        return 0;
    }
}

async function getNumberOfDeployedContractsByAddress(Addr) {
  try {
    const res = await axios.get(
      `https://api.etherscan.io/v2/api?chainid=${CHAIN_ID}&module=account&action=txlist&address=${Addr}&startblock=0&endblock=latest&sort=asc&apikey=${APIKEY}`
    );

    const transactions = res.data.result || [];

    const deployedContracts = transactions.filter(tx => !tx.to);

    return deployedContracts.length;
  }
  catch (err) {
    console.error(`Error fetching transactions: ${err.message}`);
    return 0;
  }
}

async function getContractDeploymentTransactions(Addr) {
  try {
    const contractTransactions = [];

    // Step 1: Get total number of transactions for the address
    const txCountResponse = await axios.get(
      `https://api.etherscan.io/v2/api?chainid=${CHAIN_ID}&module=proxy&action=eth_getTransactionCount&address=${Addr}&tag=latest&apikey=${APIKEY}`
    );

    const totalTxCount = parseInt(txCountResponse.data.result, 16);

    // Step 2: Fetch all transactions for the address
    const txListResponse = await axios.get(
      `https://api.etherscan.io/v2/api?chainid=${CHAIN_ID}&module=account&action=txlist&address=${Addr}&startblock=0&endblock=latest&page=1&offset=${totalTxCount + 1}&sort=asc&apikey=${APIKEY}`
    );

    const transactions = txListResponse.data.result || [];

    // Step 3: Filter contract creation transactions (where 'to' is empty)
    for (const tx of transactions) {
      if (!tx.to) {
        contractTransactions.push(tx);
      }
    }

    return contractTransactions;
  } catch (error) {
    console.error(`Error while fetching contract deployment transactions: ${error}`);
    return [];
  }
}

module.exports = {
    getNativeBalance,
    getNativeBalanceMulti,
    getHistoricalNativeBalance,
    getAddressFundedBy,
    getNormalTransactionsbyAddress,
    getNumberofInternalTransactions,
    getNumberofTransactions,
    getNumberOfDeployedContractsByAddress,
    getContractDeploymentTransactions
}
