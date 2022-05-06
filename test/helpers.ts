import { resetHardhatContext } from 'hardhat/plugins-testing'
import { HardhatRuntimeEnvironment } from 'hardhat/types'
import path from 'path'
import fs from 'fs'

declare module 'mocha' {
  interface Context {
    hre: HardhatRuntimeEnvironment
  }
}

export function useEnvironment(fixtureProjectName: string) {
  beforeEach('Loading hardhat environment', function () {
    process.chdir(path.join(__dirname, 'fixture-projects', fixtureProjectName))

    this.hre = require('hardhat')
  })

  afterEach('Resetting hardhat', function () {
    resetHardhatContext()
  })
}

export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export const readArtifactDir = (hre: HardhatRuntimeEnvironment): string[] =>
  fs.readdirSync(path.join(hre.config.paths.artifacts, 'contracts/Contract.sol'))

export const readContractJsonStat = (hre: HardhatRuntimeEnvironment): fs.Stats =>
  fs.statSync(path.join(hre.config.paths.artifacts, 'contracts/Contract.sol/Contract.json'))

export const simulateFileChange = (dummyFile: string, fileToOverwrite = 'contracts/Contract.sol') =>
  fs.copyFileSync(
    path.join(__dirname, `./dummyFiles/${dummyFile}`),
    path.join(__dirname, `./fixture-projects/hardhat-project/${fileToOverwrite}`)
  )
