import { HardhatUserConfig } from 'hardhat/types'

import '../../../src/index'

const config: HardhatUserConfig = {
  solidity: '0.8.7',
  defaultNetwork: 'hardhat',
  watcher: {
    compilation: {
      tasks: ['clean', { command: 'compile', params: { quiet: true } }],
      files: ['./contracts'],
      ignoredFiles: ['**/.editortest'],
      verbose: true,
      runOnLaunch: true,
    },
  },
}

export default config
