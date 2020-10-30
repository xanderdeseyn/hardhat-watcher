// tslint:disable-next-line no-implicit-dependencies
import { assert, expect } from "chai";

import {
  readArtifactDir,
  sleep,
  useEnvironment,
  simulateFileChange,
} from "./helpers";

describe("Integration tests examples", function () {
  describe("Happy case", function () {
    this.timeout(120_000);
    useEnvironment("hardhat-project");

    beforeEach(async function () {
      await this.hre.run("clean");
    });

    it("Can run watcher", async function () {
      try {
        simulateFileChange("Contract.sol");
        await this.hre.run("watch");
        await sleep(1000);

        console.log("=========== Simulating file change =============");
        simulateFileChange("Contract2.sol");
        await sleep(2000);
        const dir = readArtifactDir(this.hre);
        expect(dir).to.contain("TestContract2.json");

        console.log("=========== Simulating file change =============");
        simulateFileChange("Contract3.sol");
        await sleep(2000);
        const dir2 = readArtifactDir(this.hre);
        expect(dir2).to.contain("TestContract3.json");
      } catch (error) {
        assert.fail(error.message);
      }
    });
  });
});
