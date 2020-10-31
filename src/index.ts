import { extendConfig, task } from "hardhat/config";
import { HardhatConfig, HardhatUserConfig } from "hardhat/types";
import chokidar from "chokidar";

import "./type-extensions";

extendConfig(
  (config: HardhatConfig, userConfig: Readonly<HardhatUserConfig>) => {
    let w = userConfig.watcher ?? {};
    const tasks = w.tasks ?? [];

    config.watcher = {
      tasks: tasks.map((t) => {
        if (typeof t === "string") {
          return {
            command: t,
            params: {},
          };
        } else {
          return {
            command: t.command,
            params: t.params ?? {},
          };
        }
      }),
      files: w.files ?? [config.paths.sources],
      verbose: w.verbose ?? false,
    };
  }
);

task("watch", "Start the file watcher").setAction(
  async ({}, { run, tasks, config: { watcher } }) => {
    const logVerbose = (...messages: any) => {
      if (watcher.verbose) console.log(...messages);
    };

    logVerbose("Starting file watcher", watcher.files);

    // Validate tasks
    watcher.tasks.forEach((task) => {
      if (!(task.command in tasks)) {
        console.log(
          `Watcher error: task "${task.command}" is not supported by hardhat runtime.`
        );
        console.log(`Found tasks: ${JSON.stringify(Object.keys(tasks))}`);
        process.exit(1);
      }
    });

    chokidar
      .watch(watcher.files)
      .on("change", async () => {
        for (let i = 0; i < watcher.tasks.length; i++) {
          const task = watcher.tasks[i];
          logVerbose(
            `Running task "${task.command}" with params ${JSON.stringify(
              task.params
            )}`
          );
          try {
            await run(task.command, task.params);
            // This hack is required to allow running Mocha commands. Check out https://github.com/mochajs/mocha/issues/1938 for more details.
            Object.keys(require.cache).forEach(function (key) {
              delete require.cache[key];
            });
          } catch (err) {
            console.log(`Task "${task.command}" failed.`);
            console.log(err);
          }
        }
      })
      .on("error", (error: Error) => {
        console.log(`Watcher error: ${error}`);
        process.exit(1);
      });

    console.log("File watcher started.");

    await new Promise((resolve) => setTimeout(resolve, 2000000000));
  }
);
