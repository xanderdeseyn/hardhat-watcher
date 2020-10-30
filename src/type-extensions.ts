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
      directories?: string[];
      verbose?: boolean;
    };
  }

  // Fully resolved config
  export interface HardhatConfig {
    watcher: {
      tasks: Required<ExpandedWatcherTask>[];
      directories: string[];
      verbose: boolean;
    };
  }
}
