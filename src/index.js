const axios = require("axios");
require("dotenv").config({ quiet: true });

const CHAIN_ID = process.env.CHAIN_ID || 8453; //Defult Base Mainnet
const APIKEY = process.env.BASE_SEPHOLIA_API_KEY;


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
    console.error(`❌ Error fetching transactions: ${err.message}`);
    return 0;
  }
}





// test line
(async () => {
  const count = await getNumberOfDeployedContractsByAddress(Addrr);
  console.log("Dep Count:", count);
})();

(async () => {
  const count = await getNumberofInternalTransactions(Addrr);
  console.log("Internal Transactions Count:", count);
})();

(async () => {
  const count = await getNumberofTransactions(Addrr);
  console.log("Internal Count:", count);
})();





module.exports = {
    getNumberofInternalTransactions,
    getNumberOfDeployedContractsByAddress,
    getNumberofTransactions
}