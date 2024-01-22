const HDWalletProvider = require("@truffle/hdwallet-provider")
const keys = require("./keys.json")

module.exports = {
  contracts_build_directory: "./public/contracts",
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 7545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
    },
    sepolia: {
      provider: () =>
        new HDWalletProvider({
          mnemonic: {
            phrase: keys.MNEMONIC
          },
          providerOrUrl: `wss://sepolia.infura.io/ws/v3/${keys.INFURA_PROJECT_ID}`,
          addressIndex: 0
        }),
        // new HDWalletProvider({
        //   privateKeys: ["e356092a8a63ae5c371e871656b06862a8b2aefaf64cbfe8fb75fa5399f6c9ae"],
        //   providerOrUrl: `wss://sepolia.infura.io/ws/v3/${keys.INFURA_PROJECT_ID}`,
        //   addressIndex: 0,
        // }),
        
      network_id: 11155111,
      gasPrice: 100000000000,   // how much to spend for unit of gas
      networkCheckoutTimeout: 10000,
      timeoutBlocks: 200    // number of blocks before deployment times out
    }
  },
  compilers: {
    solc: {
      version: "0.8.4",     
    }
  }
}


  //  > transaction hash:    0xa5ba36155fdcaf2121b5050051411f1cee85e101cc88d0bc34b016b9b7a05cbe
  //  > contract address:    0xf76241F98AD19ACe5900d4DeeB5356d18071E676