/* eslint-disable no-restricted-syntax */

import fs from 'fs';
import path from 'path';
import {
    expect
} from 'chai';
import writeIndex from '../src/utilities/writeIndex';
import codeExample from './codeExample';

const readFile = (filePath) => {
  return fs.readFileSync(filePath, 'utf8');
};

const removeFile = (filePath) => {
  fs.unlinkSync(filePath);
};

const appendToFile = (filePath, content) => {
  fs.appendFileSync(filePath, content, 'utf-8');
};

const fixturesPath = path.resolve(__dirname, 'fixtures/write-index');

describe('writeIndex()', () => {
  it('creates index in target directory', () => {
    const indexFilePath = path.resolve(fixturesPath, 'mixed/index.js');

    removeFile(indexFilePath);
    writeIndex([path.resolve(fixturesPath, 'mixed')]);
    const indexCode = readFile(indexFilePath);

    expect(indexCode).to.equal(codeExample(`
// @create-index

export { default as bar } from './bar';
export { default as foo } from './foo.js';
    `));
  });

  it('creates index with config in target directory', () => {
    const indexFilePath = path.resolve(fixturesPath, 'with-config/index.js');
    // eslint-disable-next-line
    const ignoredExportLine = `export { default as bar } from './bar.js';`;

    appendToFile(indexFilePath, ignoredExportLine);
    expect(readFile(indexFilePath).includes(ignoredExportLine)).to.equal(true);

    writeIndex([path.resolve(fixturesPath, 'with-config')]);
    const indexCode = readFile(indexFilePath);

    expect(indexCode).to.equal(codeExample(`
// @create-index {"ignore":["/bar.js$/"]}

export { default as foo } from './foo.js';
    `));
  });

  it('creates index with default export', () => {
    const indexFilePath = path.resolve(fixturesPath, 'defaultName/index.js');

    removeFile(indexFilePath);

    writeIndex([path.resolve(fixturesPath, 'defaultName')], {default: 'match'});
    const indexCode = readFile(indexFilePath);

    expect(indexCode).to.equal(codeExample(`
// @create-index

export { default } from './defaultName.js';
export { default as foo } from './foo.js';
    `));
  });
});
