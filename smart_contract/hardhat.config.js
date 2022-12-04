require("@nomicfoundation/hardhat-toolbox");
// require('dotenv').config({path:__dirname+'/.env'})

// Go to https://www.alchemyapi.io, sign up, create
// a new App in its dashboard, and replace "KEY" with its key
const ALCHEMY_API_KEY = "";

// console.log(ALCHEMY_API_KEY)
// Replace this private key with your Goerli account private key
// To export your private key from Metamask, open Metamask and
// go to Account Details > Export Private Key
// Beware: NEVER put real Ether into testing accounts

/** @type import('hardhat/config').HardhatUserConfig */

module.exports = {
  solidity: "0.8.17",
  networks: {
    // goerli: {
    //   url: `https://eth-goerli.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
    //   accounts: [GOERLI_PRIVATE_KEY],
    // },
    polygon_mumbai: {
      url: process.env.MUMBAI_ALCHEMY_URL
        ? process.env.MUMBAI_ALCHEMY_URL
        : "https://polygon-mumbai.g.alchemy.com/v2/SsXq77WPoWiZM6jztFaUsW_dlvNq7_Qt",
      accounts: [
        process.env.MUMBAI_PRIVATE_KEY
          ? process.env.MUMBAI_PRIVATE_KEY
          : "4e91299fcaed3e21fb3820c2a78854a8fd11a79c345467a94884abc8c1abcbdf",
      ],
    },
  },
};
