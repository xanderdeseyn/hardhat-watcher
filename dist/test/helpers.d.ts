import { HardhatRuntimeEnvironment } from "hardhat/types";
declare module "mocha" {
    interface Context {
        hre: HardhatRuntimeEnvironment;
    }
}
export declare function useEnvironment(fixtureProjectName: string): void;
export declare function sleep(ms: number): Promise<unknown>;
export declare const readArtifactDir: (hre: HardhatRuntimeEnvironment) => string[];
export declare const simulateFileChange: (dummyFile: string, fileToOverwrite?: string) => void;
//# sourceMappingURL=helpers.d.ts.map