import {
    expect
} from 'chai';
import sortByDepth from './../src/utilities/sortByDepth';

describe('sortByDepth()', () => {
    it('sorts from deepest to the most shallow', () => {
        let paths,
            sortedPaths;

        paths = [
            '/b',
            '/a',
            '/a/b/c',
            '/a/b'
        ];

        sortedPaths = sortByDepth(paths);

        expect(sortedPaths).to.deep.equal(['/a/b/c', '/a/b', '/b', '/a']);
    });
});
