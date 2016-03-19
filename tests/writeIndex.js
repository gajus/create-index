/* eslint-disable no-restricted-syntax */

import {
    expect
} from 'chai';
import fs from 'fs';
import path from 'path';
import codeExample from './codeExample';
import writeIndex from './../src/utilities/writeIndex';

const fixturesPath = path.resolve(__dirname, './../../fixtures/write-index');

describe('writeIndex()', () => {
    it('creates index in target directory', () => {
        const indexFilePath = path.resolve(fixturesPath, './mixed/index.js');

        try {
            fs.unlinkSync(indexFilePath);
        /* eslint-disable no-empty */
        } catch (error) {

        }
        /* eslint-enable no-empty */

        writeIndex([path.resolve(fixturesPath, './mixed')]);

        const indexCode = fs.readFileSync(indexFilePath, 'utf8');

        expect(indexCode).to.equal(codeExample(`
'create index';

export bar from './bar';
export foo from './foo.js';
        `));
    });
});
