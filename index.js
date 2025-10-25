const axios = require("axios");
require("dotenv").config({ quiet: true });

const CHAIN_ID = process.env.CHAIN_ID || 8453; //Defult Base Mainnet
const APIKEY = process.env.ETH_API_KEY;


if (!APIKEY) {
  console.warn(`
    ⚠️  Missing API Key!
    Please add BASESCAN_API_KEY to your .env file.
    Example:
    BASESCAN_API_KEY=your_api_key_here
    `);
  process.exit(1); // stop program so it doesn’t run incorrectly
}

const Addrr = "0xCAa6d6617690588371d3B94c692Fc3273F3e14f4"; //test

async function getNumberofInternalTransactions(Addr) {
    try{
        const internalTransactionCount = await axios.get(`https://api.etherscan.io/v2/api?chainid=${CHAIN_ID}&module=account&action=txlistinternal&apikey=${APIKEY}&startblock=0&endblock=latest&page=1&offset=1000&sort=desc&address=${Addr}`);

        return internalTransactionCount.data["result"].length;
    }catch{
        console.error("Error fetching transactions:", err.message);
        return 0;
    }
}

async function getNumberofTransactions(Addr) {
    try{
        const internalTransactionCount = await axios.get(`https://api.etherscan.io/v2/api?chainid=${CHAIN_ID}&module=account&action=txlist&apikey=${APIKEY}&startblock=0&endblock=latest&page=1&offset=1000&sort=desc&address=${Addr}`);

        return internalTransactionCount.data["result"].length;
    }catch{
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
      `https://api.etherscan.io/v2/api?chainid=${CHAIN_ID}&module=proxy&action=eth_getTransactionCount&address=${Addr}&tag=latest&apikey=${process.env.ETH_API_KEY}`
    );

    const totalTxCount = parseInt(txCountResponse.data.result, 16);

    // Step 2: Fetch all transactions for the address
    const txListResponse = await axios.get(
      `https://api.etherscan.io/v2/api?chainid=${CHAIN_ID}&module=account&action=txlist&address=${Addr}&startblock=0&endblock=latest&page=1&offset=${totalTxCount + 1}&sort=asc&apikey=${process.env.ETH_API_KEY}`
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

async function makeGivenContractVerified(contractAddress, sourceCode, codeFormat, contractName, compilerVersion) {
  try {
    const data = {
      chainid: CHAIN_ID,
      apikey: APIKEY,
      module: "contract",
      action: "verifysourcecode",
      contractaddress: contractAddress,
      sourceCode: sourceCode,
      codeformat: codeFormat,
      contractname: contractName,
      compilerversion: compilerVersion,
      optimizationUsed: 0,
      runs: 200,
      constructorArguements: "",
      evmversion: "",
      licenseType: 1,
    };

    const response = await axios.post(
      "https://api.etherscan.io/v2/api",
      new URLSearchParams(data).toString(),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    const contentType = response.headers["content-type"];
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Received non-JSON response");
    }

    const result = response.data;

    if (result.status === "1") {
      console.log("Contract verification submitted successfully:", result);
      return result;
    } else {
      console.log(`Verification failed: ${result.status}; ${result.message}; ${result.result}`);
      return result;
    }
  } catch (error) {
    console.error("Error while verifying contract:", error);
    return null;
  }
}


module.exports = {
    getNumberofInternalTransactions,
    getNumberOfDeployedContractsByAddress,
    getNumberofTransactions,
    getContractDeploymentTransactions
}