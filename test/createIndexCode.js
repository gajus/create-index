/* eslint-disable no-restricted-syntax */

import {
    expect
} from 'chai';
import createIndexCode from '../src/utilities/createIndexCode';
import codeExample from './codeExample';

describe('createIndexCode()', () => {
  let parseFiles;

  beforeEach(() => {
    parseFiles = (files) => {
      return files.map((fileName) => {
        return {
          containsDefaultExport: true,
          fileName
        };
      });
    };
    createIndexCode.__Rewire__('parseFiles', parseFiles);
  });

  it('describes no children', () => {
    const indexCode = createIndexCode([]);

    expect(indexCode).to.equal(codeExample(`
// @create-index
        `));
  });
  it('describes a single child', () => {
    const indexCode = createIndexCode(['foo']);

    expect(indexCode).to.equal(codeExample(`
// @create-index

import _foo from './foo';
export const foo = _foo;

export default {
  foo
};
        `));
  });
  it('describes multiple children', () => {
    const indexCode = createIndexCode(['bar', 'foo']);

    expect(indexCode).to.equal(codeExample(`
// @create-index

import _bar from './bar';
export const bar = _bar;

import _foo from './foo';
export const foo = _foo;

export default {
  bar,
  foo
};
        `));
  });
  context('file with extension', () => {
    it('removes the extension from the export statement', () => {
      const indexCode = createIndexCode(['foo.js']);

      expect(indexCode).to.equal(codeExample(`
// @create-index

import _foo from './foo.js';
export const foo = _foo;

export default {
  foo
};
            `));
    });
  });
  context('multiple, unsorted', () => {
    it('sorts the files', () => {
      const indexCode = createIndexCode(['foo', 'bar']);

      expect(indexCode).to.equal(codeExample(`
// @create-index

import _bar from './bar';
export const bar = _bar;

import _foo from './foo';
export const foo = _foo;

export default {
  bar,
  foo
};
            `));
    });
  });
});
