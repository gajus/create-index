import {
    expect
} from 'chai';
import sortByDepth from './../src/utilities/sortByDepth';

describe('sortByDepth()', () => {
  it('sorts from deepest to the most shallow', () => {
    const paths = [
      '/b',
      '/a',
      '/a/b/c',
      '/a/b'
    ];

    const sortedPaths = sortByDepth(paths);

    expect(sortedPaths).to.deep.equal(['/a/b/c', '/a/b', '/b', '/a']);
  });
});
