#!/usr/bin/env node

import yargs from 'yargs';
import {
    writeIndexCli
} from './../utilities';

let argv;

argv = yargs
    .demand(1)
    .options({
        'update-index': {
            default: false,
            description: 'Recursively iterates target directories looking for "index.js" files that start with "\'create index\';\\n" (create-index index file). Updates found index files. Does not create new index files.',
            type: 'boolean'
        }
    })
    .example('create-index ./src ./src/utilities', 'Creates or updates an existing create-index index file in the target (./src, ./src/utilities) directories.')
    .example('create-index --update-index ./src ./tests', 'Finds all create-index index files in the target directories and descending directories. Updates found index files.')
    .argv;

writeIndexCli(argv._, {
    updateIndex: argv.updateIndex
});
