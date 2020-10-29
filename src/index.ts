import { extendConfig, task } from "hardhat/config";
import { HardhatConfig, HardhatUserConfig } from "hardhat/types";
import chokidar from "chokidar";

import "./type-extensions";

extendConfig(
  (config: HardhatConfig, userConfig: Readonly<HardhatUserConfig>) => {
    let w = userConfig.watcher ?? {};

    config.watcher = {
      tasks: w.tasks ?? [],
      directories: w.directories ?? [config.paths.sources],
      verbose: w.verbose ?? false,
    };
  }
);

task("watch", "Start the file watcher").setAction(
  async ({}, { run, tasks, config: { watcher } }) => {
    console.log("Starting file watcher", watcher.directories);

    // Validate tasks
    watcher.tasks.forEach((task) => {
      if (!(task in tasks)) {
        console.log(
          `Watcher error: task "${task}" is not supported by hardhat runtime.`
        );
        process.exit(1);
      }
    });

    chokidar
      .watch(watcher.directories)
      .on("change", async () => {
        for (let i = 0; i < watcher.tasks.length; i++) {
          const task = watcher.tasks[i];
          console.log(`Running task "${task}"`);
          await run(task);
        }
      })
      .on("error", (error: Error) => {
        console.log(`Watcher error: ${error}`);
        process.exit(1);
      });

    return new Promise(() => {});
  }
);
