const axios = require("axios");
const { CHAIN_ID, APIKEY } = require("./config");

// Contract Functions
async function checkProxyVerificationStatus(guid) {
  try {
    const res = await axios.get(`https://api.etherscan.io/v2/api?apikey=${APIKEY}&chainid=${CHAIN_ID}&module=contract&action=checkproxyverification&guid=${guid}`);

    // status "0" still carries a meaningful message (pending / not verified), so return it either way
    return res.data?.result || null;
  } catch (err) {
    console.error("Error checking proxy verification status:", err?.message || err);
    return null;
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
    checkProxyVerificationStatus,
    makeGivenContractVerified
}
