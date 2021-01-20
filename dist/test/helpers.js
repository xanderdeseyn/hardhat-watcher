"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.simulateFileChange = exports.readArtifactDir = exports.sleep = exports.useEnvironment = void 0;
const plugins_testing_1 = require("hardhat/plugins-testing");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
function useEnvironment(fixtureProjectName) {
    beforeEach("Loading hardhat environment", function () {
        process.chdir(path_1.default.join(__dirname, "fixture-projects", fixtureProjectName));
        this.hre = require("hardhat");
    });
    afterEach("Resetting hardhat", function () {
        plugins_testing_1.resetHardhatContext();
    });
}
exports.useEnvironment = useEnvironment;
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
exports.sleep = sleep;
exports.readArtifactDir = (hre) => fs_1.default.readdirSync(path_1.default.join(hre.config.paths.artifacts, "contracts/Contract.sol"));
exports.simulateFileChange = (dummyFile, fileToOverwrite = "contracts/Contract.sol") => fs_1.default.copyFileSync(path_1.default.join(__dirname, `./dummyFiles/${dummyFile}`), path_1.default.join(__dirname, `./fixture-projects/hardhat-project/${fileToOverwrite}`));
//# sourceMappingURL=helpers.js.map