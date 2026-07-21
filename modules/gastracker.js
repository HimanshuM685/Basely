const axios = require("axios");
const { CHAIN_ID, APIKEY } = require("./config");

// Gas Functions
async function getEstimatedConfirmationTime(gasPriceWei) {
  try {
    const res = await axios.get(`https://api.etherscan.io/v2/api?apikey=${APIKEY}&chainid=${CHAIN_ID}&module=gastracker&action=gasestimate&gasprice=${gasPriceWei}`);

    if (res.data?.status !== "1") {
      console.error(`API Error: ${res.data?.result || res.data?.message || "Unknown error"}`);
      return null;
    }

    return res.data.result; // estimated confirmation time in seconds
  } catch (err) {
    console.error("Error fetching gas estimate:", err?.message || err);
    return null;
  }
}

module.exports = {
    getEstimatedConfirmationTime
}
