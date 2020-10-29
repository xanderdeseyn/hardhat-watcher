# hardhat-watcher

_Automatically run Hardhat actions when files change_

## Installation

<_A step-by-step guide on how to install the plugin_>

```bash
npm install hardhat-watcher
```

or 

```bash
yarn add hardhat-watcher
```

Import the plugin in your `hardhat.config.js`:

```js
require("hardhat-watcher");
```

Or if you are using TypeScript, in your `hardhat.config.ts`:

```ts
import "hardhat-watcher";
```

## Tasks

This plugin adds the _watch_ task to Hardhat:
```
`npx hardhat watch`
```

## Configuration

<_A description of each extension to the HardhatConfig or to its fields_>

This plugin extends the `HardhatUserConfig`'s `ProjectPathsUserConfig` object with an optional
`watcher` field. Every property is optional.

This is an example of how to set it:

```js
module.exports = {
  watcher: {
    tasks?: string[]; // Every task of the hardhat runtime is supported (including other plugins!)
    directories?: string[]; // Directories to watch for changes. (defaults to `config.paths.sources`, which itself defaults to `contracts`)
    verbose?: boolean; // Turn on for extra logging
  }
};
```

## Usage

The most basic use case, which is simply compiling your files on change, is accomplished very easily with this config:

```js
module.exports = {
  watcher: {
    tasks: ["compile"],
  },
}
```