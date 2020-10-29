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

        simulateFileChange("Contract2.sol");
        await sleep(4000);
        const dir = readArtifactDir(this.hre);
        console.log(dir);
        expect(dir).to.contain("TestContract2.json");

        simulateFileChange("Contract3.sol");
        await sleep(5000);
        const dir2 = readArtifactDir(this.hre);
        console.log(dir2);
        expect(dir2).to.contain("TestContract3.json");
      } catch (error) {
        assert.fail(error.message);
      }
    });
  });
});
