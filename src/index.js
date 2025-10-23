const axios = require("axios");


async function getNumberofInternalTransactions(Addr) {
    const internalTransactionCount = await axios.get(`https://api.etherscan.io/v2/api?chainid=?module=account&action=txlistinternal&address=${Address}&startblock=0&endblock=latest&page=1&offset=10000&sort=asc&apikey=${process.env.BASE_SEPHOLIA_API_KEY}`)

    return internalTransactionCount.data["result"].length;
}

as

async function getNumberOfDeployedContractsByAddress(Addr){

}