require('dotenv').config(); 
const hre = require("hardhat");
const ethers = require("ethers");

const { DefenderRelayProvider, DefenderRelaySigner } = require('defender-relay-client/lib/ethers');

const credentials = { apiKey: process.env.OPENZEPPELIN_RELAY_API_KEY, apiSecret: process.env.OPENZEPPELIN_RELAY_API_SECRET };
const provider = new DefenderRelayProvider(credentials);
const signer = new DefenderRelaySigner(credentials, provider);

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

  const lockedAmount = ethers.utils.parseEther("0.001");

  console.log(
    `lockedAmount = ${lockedAmount}`
  );

  const Lock = await hre.ethers.getContractFactory("Lock");
  const connectLock = await Lock.connect(signer);
  const lock = await connectLock.deploy(unlockTime, { value: lockedAmount });

  await lock.deployed();

  console.log(
    `Lock with 1 ETH and unlock timestamp ${unlockTime} deployed to ${lock.address}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
