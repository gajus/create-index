#!/usr/bin/env node

import yargs from 'yargs';
import {
    writeIndexCli
} from '../utilities';

const argv = yargs
  .demand(1)
  .options({
    recursive: {
      alias: 'r',
      default: false,
      description: 'Create/update index files recursively. Halts on any unsafe "index.js" files.',
      type: 'boolean'
    }
  })
  .options({
    ignoreUnsafe: {
      alias: 'i',
      default: false,
      description: 'Ignores unsafe "index.js" files instead of halting.',
      type: 'boolean'
    }
  })
  .options({
    update: {
      alias: 'u',
      default: false,
      description: 'Updates only previously created index files (recursively).',
      type: 'boolean'
    }
  })
  .options({
    banner: {
      description: 'Add a custom banner at the top of the index file',
      type: 'string'
    }
  })
  .example('create-index ./src ./src/utilities', 'Creates or updates an existing create-index index file in the target (./src, ./src/utilities) directories.')
  .example('create-index --update ./src ./tests', 'Finds all create-index index files in the target directories and descending directories. Updates found index files.')
  .argv;

writeIndexCli(argv._, {
  banner: argv.banner,
  ignoreUnsafe: argv.ignoreUnsafe,
  recursive: argv.recursive,
  updateIndex: argv.update
});
