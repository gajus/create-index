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
  .options({
    default: {
      alias: 'd',
      default: 'default',
      description: 'Determines which file will be used as the default export. Either "default" or "match".',
      type: 'string'
    }
  })
  .options({
    extensions: {
      alias: 'x',
      default: ['js'],
      description: 'Allows some extensions to be parsed as valid source. First extension will always be preferred to homonyms with another allowed extension.',
      type: 'array'
    }
  })
  .example('create-index ./src ./src/utilities', 'Creates or updates an existing create-index index file in the target (./src, ./src/utilities) directories.')
  .example('create-index --update ./src ./tests', 'Finds all create-index index files in the target directories and descending directories. Updates found index files.')
  .example('create-index ./src --extensions js jsx', 'Creates or updates an existing create-index index file in the target (./src) directory for both .js and .jsx extensions.')
  .argv;

writeIndexCli(argv._, {
  banner: argv.banner,
  extensions: argv.extensions,
  ignoreUnsafe: argv.ignoreUnsafe,
  recursive: argv.recursive,
  updateIndex: argv.update
});
