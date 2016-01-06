/* eslint-disable no-restricted-syntax */

import {
    expect
} from 'chai';
import fs from 'fs';
import path from 'path';
import codeExample from './codeExample';
import writeIndex from './../src/writeIndex';

const fixturesPath = path.resolve(__dirname, './fixtures/write-index');

describe('writeIndex()', () => {
    it('creates index in target directory', () => {
        let indexCode,
            indexFilePath;

        indexFilePath = path.resolve(fixturesPath, './mixed/index.js');

        try {
            fs.unlinkSync(indexFilePath);
        } catch (error) {

        }

        writeIndex([path.resolve(fixturesPath, './mixed')]);

        indexCode = fs.readFileSync(indexFilePath, 'utf8');

        expect(indexCode).to.equal(codeExample(`
'create index';

import bar from './bar';
import foo from './foo.js';

export {
    bar,
    foo
};
        `));
    });
});
