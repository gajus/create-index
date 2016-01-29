#!/usr/bin/env node

import yargs from 'yargs';
import {
    writeIndexCli
} from './../utilities';

let argv;

argv = yargs
    .demand(1)
    .argv;

writeIndexCli(argv._);
