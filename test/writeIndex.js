/* eslint-disable no-restricted-syntax */

import fs from 'fs';
import path from 'path';
import {
    expect
} from 'chai';
import writeIndex from '../src/utilities/writeIndex';
import codeExample from './codeExample';

const fixturesPath = path.resolve(__dirname, 'fixtures/write-index');

describe('writeIndex()', () => {
  it('creates index in target directory', () => {
    const indexFilePath = path.resolve(fixturesPath, 'mixed/index.js');

    try {
      fs.unlinkSync(indexFilePath);

      // eslint-disable-next-line no-empty
    } catch (error) {

    }

    writeIndex([path.resolve(fixturesPath, 'mixed')]);

    console.log({indexFilePath});
    const indexCode = fs.readFileSync(indexFilePath, 'utf8');

    expect(indexCode).to.equal(codeExample(`
// @create-index

import * as _bar from './bar';
export const bar = _bar;

import _foo from './foo.js';
export const foo = _foo;

export default {
  bar,
  foo
};
        `));
  });
});
