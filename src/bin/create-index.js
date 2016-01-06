#!/usr/bin/env node

import yargs from 'yargs';
import writeIndex from './../writeIndex';

let argv;

argv = yargs
    .demand(1)
    .argv;

writeIndex(argv._);

/* eslint-disable no-console */
console.log('OK!');
/* eslint-enable no-console */
