import { HardhatUserConfig } from "hardhat/types";

import "../../../src/index";

const config: HardhatUserConfig = {
  solidity: "0.7.3",
  defaultNetwork: "hardhat",
  watcher: {
    tasks: ["clean", "compile"],
    verbose: true,
  },
};

export default config;
