# hardhat-watcher

_Automatically run Hardhat actions when files change_

## Installation

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
```bash
npx hardhat watch
```

## Configuration

This plugin extends the `HardhatUserConfig`'s object with an optional
`watcher` field. Every property of `watcher` is optional.

This is the complete type:

```js
module.exports = {
  watcher: {
    tasks?: string[]; // Every task of the hardhat runtime is supported (including other plugins!)
    directories?: string[]; // Directories to watch for changes. (defaults to `[config.paths.sources]`, which itself defaults to `contracts`)
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

and subsequently running `npx hardhat watch`