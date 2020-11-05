import { HardhatUserConfig } from "hardhat/types";

import "../../../src/index";

const config: HardhatUserConfig = {
  solidity: "0.7.3",
  defaultNetwork: "hardhat",
  watcher: {
    compilation: {
      tasks: ["clean", { command: "compile", params: { quiet: true } }],
      files: ["./contracts"],
      verbose: true,
    },
  },
};

export default config;
