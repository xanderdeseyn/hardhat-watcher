// tslint:disable-next-line no-implicit-dependencies
import { assert, expect } from 'chai'

import { readContractJsonStat, sleep, useEnvironment, simulateFileChange } from './helpers'

describe('Watcher tests', function () {
  this.timeout(30000)
  useEnvironment('hardhat-project')

  beforeEach(async function () {
    await this.hre.run('clean')
  })

  it('Watch contracts and clean + compile on change', async function () {
    try {
      let lastTs = Date.now()
      simulateFileChange('Contract.sol')
      this.hre.run('watch', { watcherTask: 'compilation' })
      await sleep(1000)

      console.log('=========== Simulating file change =============')
      simulateFileChange('Contract2.sol')
      await sleep(7500)
      expect(readContractJsonStat(this.hre).mtime.valueOf()).to.be.greaterThan(lastTs)

      lastTs = Date.now()
      console.log('=========== Simulating file change =============')
      simulateFileChange('Contract3.sol')
      await sleep(7500)
      expect(readContractJsonStat(this.hre).mtime.valueOf()).to.be.greaterThan(lastTs)
    } catch (error: any) {
      assert.fail(error.message)
    }
  })
})
