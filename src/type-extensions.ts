import "hardhat/types/config";
import "hardhat/types/runtime";

declare module "hardhat/types/config" {
  export type WatcherTask = string | ExpandedWatcherTask;

  export type ExpandedWatcherTask = {
    command: string;
    params?: {
      [key: string]: any;
    };
  };

  // User facing config
  export interface HardhatUserConfig {
    watcher?: {
      tasks?: WatcherTask[];
      files?: string[];
      verbose?: boolean;
    };
  }

  // Fully resolved config
  export interface HardhatConfig {
    watcher: {
      tasks: Required<ExpandedWatcherTask>[];
      files: string[];
      verbose: boolean;
    };
  }
}
