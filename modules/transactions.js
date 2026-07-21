const axios = require("axios");
const { CHAIN_ID, APIKEY } = require("./config");

// Transaction Functions
async function getTransactionReceiptStatus(txHash) {
  try {
    const res = await axios.get(`https://api.etherscan.io/v2/api?apikey=${APIKEY}&chainid=${CHAIN_ID}&module=transaction&action=gettxreceiptstatus&txhash=${txHash}`);

    if (res.data?.status !== "1") {
      console.error(`API Error: ${res.data?.result || res.data?.message || "Unknown error"}`);
      return null;
    }

    return res.data.result?.status; // "1" = success, "0" = failed
  } catch (err) {
    console.error("Error fetching transaction receipt status:", err?.message || err);
    return null;
  }
}

module.exports = {
    getTransactionReceiptStatus
}
