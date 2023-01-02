require('dotenv').config(); 
const fs = require('fs');
const projectId = process.env.PROJECT_ID;
require("@nomiclabs/hardhat-waffle");

module.exports = {
  defaultNetwork: 'hardhat',
  networks: {
    local: {
      chainId: 31337,
      url: 'http://localhost:8545/',
    },
    ropsten: {
      url: `https://ropsten.infura.io/v3/${projectId}`,
    },
    mumbai: {
      url: `https://polygon-mumbai.infura.io/v3/${projectId}`,
    },
    goerli: {
      url: `https://goerli.infura.io/v3/${projectId}`,
    },
    sepolia: {
      url: `https://sepolia.infura.io/v3/${projectId}`,
    }
  },

  solidity: {
    version: '0.8.13',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
