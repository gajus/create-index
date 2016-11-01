import path from 'path';
import {
    expect
} from 'chai';
import glob from 'glob';
import findIndexFiles from '../src/utilities/findIndexFiles';

const fixturesPath = path.resolve(__dirname, '../../fixtures/find-index-files');

describe('findIndexFiles()', () => {
  it('finds only the directories that have an existing valid index file', () => {
    let names;

    names = findIndexFiles(path.resolve(fixturesPath));
    names = names.sort();

    expect(names).to.deep.equal(glob.sync(path.resolve(fixturesPath, './**/find-*')));
  });
});
