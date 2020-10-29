import "hardhat/types/config";
import "hardhat/types/runtime";

declare module "hardhat/types/config" {
  export type Watcher = {
    tasks?: string[];
    directories?: string[];
    verbose?: boolean;
  };

  // User facing config
  export interface HardhatUserConfig {
    watcher?: Watcher;
  }

  // Fully resolved config
  export interface HardhatConfig {
    watcher: Required<Watcher>;
  }
}
