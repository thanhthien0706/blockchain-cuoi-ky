import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
// import "hardhat-deploy"


const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  solidity: "0.8.19",
};

export default config;
