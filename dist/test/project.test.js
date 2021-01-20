"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line no-implicit-dependencies
const chai_1 = require("chai");
const helpers_1 = require("./helpers");
describe("Watcher tests", function () {
    this.timeout(15000);
    helpers_1.useEnvironment("hardhat-project");
    beforeEach(async function () {
        await this.hre.run("clean");
    });
    it("Watch contracts and clean + compile on change", async function () {
        try {
            helpers_1.simulateFileChange("Contract.sol");
            this.hre.run("watch", { watcherTask: "compilation" });
            await helpers_1.sleep(1000);
            console.log("=========== Simulating file change =============");
            helpers_1.simulateFileChange("Contract2.sol");
            await helpers_1.sleep(2000);
            const dir = helpers_1.readArtifactDir(this.hre);
            chai_1.expect(dir).to.contain("TestContract2.json");
            console.log("=========== Simulating file change =============");
            helpers_1.simulateFileChange("Contract3.sol");
            await helpers_1.sleep(2000);
            const dir2 = helpers_1.readArtifactDir(this.hre);
            chai_1.expect(dir2).to.contain("TestContract3.json");
        }
        catch (error) {
            chai_1.assert.fail(error.message);
        }
    });
});
//# sourceMappingURL=project.test.js.map