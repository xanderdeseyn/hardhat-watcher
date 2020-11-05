// tslint:disable-next-line no-implicit-dependencies
import { assert, expect } from "chai";

import {
  readArtifactDir,
  sleep,
  useEnvironment,
  simulateFileChange,
} from "./helpers";

describe("Watcher tests", function () {
  this.timeout(15000);
  useEnvironment("hardhat-project");

  beforeEach(async function () {
    await this.hre.run("clean");
  });

  it("Watch contracts and clean + compile on change", async function () {
    try {
      simulateFileChange("Contract.sol");
      this.hre.run("watch", { watcherTask: "compilation" });
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
