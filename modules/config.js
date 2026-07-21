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

module.exports = { CHAIN_ID, APIKEY };
