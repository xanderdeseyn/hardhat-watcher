"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../../../src/index");
const config = {
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
exports.default = config;
//# sourceMappingURL=hardhat.config.js.map