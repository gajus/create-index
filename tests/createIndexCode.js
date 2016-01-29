/* eslint-disable no-restricted-syntax */

import {
    expect
} from 'chai';

import createIndexCode from './../src/utilities/createIndexCode';

import codeExample from './codeExample';

describe('createIndexCode()', () => {
    it('describes no children', () => {
        let indexCode;

        indexCode = createIndexCode([]);

        expect(indexCode).to.equal(codeExample(`
'create index';
        `));
    });
    it('describes a single child', () => {
        let indexCode;

        indexCode = createIndexCode(['foo']);

        expect(indexCode).to.equal(codeExample(`
'create index';

export foo from './foo';
        `));
    });
    it('describes multiple children', () => {
        let indexCode;

        indexCode = createIndexCode(['bar', 'foo']);

        expect(indexCode).to.equal(codeExample(`
'create index';

export bar from './bar';
export foo from './foo';
        `));
    });
    context('file with extension', () => {
        it('removes the extension from the export statement', () => {
            let indexCode;

            indexCode = createIndexCode(['foo.js']);

            expect(indexCode).to.equal(codeExample(`
'create index';

export foo from './foo.js';
            `));
        });
    });
    context('multiple, unsorted', () => {
        it('sorts the files', () => {
            let indexCode;

            indexCode = createIndexCode(['foo', 'bar']);

            expect(indexCode).to.equal(codeExample(`
'create index';

export bar from './bar';
export foo from './foo';
            `));
        });
    });
});
