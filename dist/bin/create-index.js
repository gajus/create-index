#!/usr/bin/env node
'use strict';

var _yargs = require('yargs');

var _yargs2 = _interopRequireDefault(_yargs);

var _utilities = require('../utilities');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const argv = _yargs2.default.demand(1).options({
  recursive: {
    alias: 'r',
    default: false,
    description: 'Create/update index files recursively. Halts on any unsafe "index.js" files.',
    type: 'boolean'
  }
}).options({
  ignoreUnsafe: {
    alias: 'i',
    default: false,
    description: 'Ignores unsafe "index.js" files instead of halting.',
    type: 'boolean'
  }
}).options({
  ignoreDirectories: {
    alias: 'd',
    default: false,
    description: 'Ignores importing directories into the index file, even if they have a safe "index.js".',
    type: 'boolean'
  }
}).options({
  update: {
    alias: 'u',
    default: false,
    description: 'Updates only previously created index files (recursively).',
    type: 'boolean'
  }
}).options({
  banner: {
    description: 'Add a custom banner at the top of the index file',
    type: 'string'
  }
}).options({
  extensions: {
    alias: 'x',
    default: ['js'],
    description: 'Allows some extensions to be parsed as valid source. First extension will always be preferred to homonyms with another allowed extension.',
    type: 'array'
  }
}).options({
  implicitDefault: {
    alias: 'm',
    default: false,
    description: 'Uses implicit defaults as implicit instead of explicit. export { default as thing } from \'./thing.js\' becomes export thing from \'./thing.js\'',
    type: 'boolean'
  }
}).options({
  wildcardFolders: {
    alias: 'w',
    default: false,
    description: 'Export folders as wildcards instead of defaults. Works well with recursion.',
    type: 'boolean'
  }
}).example('create-index ./src ./src/utilities', 'Creates or updates an existing create-index index file in the target (./src, ./src/utilities) directories.').example('create-index --update ./src ./tests', 'Finds all create-index index files in the target directories and descending directories. Updates found index files.').example('create-index ./src --extensions js jsx', 'Creates or updates an existing create-index index file in the target (./src) directory for both .js and .jsx extensions.').argv;

(0, _utilities.writeIndexCli)(argv._, {
  banner: argv.banner,
  extensions: argv.extensions,
  ignoreDirectories: argv.ignoreDirectories,
  ignoreUnsafe: argv.ignoreUnsafe,
  implicitDefault: argv.implicitDefault,
  recursive: argv.recursive,
  updateIndex: argv.update
});
//# sourceMappingURL=create-index.js.map