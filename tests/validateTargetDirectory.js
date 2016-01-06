/* eslint-disable max-nested-callbacks */

import {
    expect
} from 'chai';
import path from 'path';
import validateTargetDirectory from './../src/validateTargetDirectory';

const fixturesPath = path.resolve(__dirname, './fixtures/validate-target-directory');

describe('validateTargetDirectory()', () => {
    describe('directory path', () => {
        context('refers to a directory that does not exist', () => {
            it('throws an error', () => {
                expect(() => {
                    validateTargetDirectory(path.resolve(fixturesPath, 'does-not-exist'));
                }).to.throw(Error, 'Directory "' + path.resolve(fixturesPath, 'does-not-exist') + '" does not exist.');
            });
        });
        context('refers to a file', () => {
            it('throws an error', () => {
                expect(() => {
                    validateTargetDirectory(path.resolve(fixturesPath, 'not-a-directory.js'));
                }).to.throw(Error, '"' + path.resolve(fixturesPath, 'not-a-directory.js') + '" is not a directory.');
            });
        });
    });
    describe('target index', () => {
        context('no index', () => {
            it('returns true', () => {
                expect(validateTargetDirectory(path.resolve(fixturesPath, 'no-index'))).to.equal(true);
            });
        });
        context.skip('safe', () => {
            it('returns true', () => {
                expect(validateTargetDirectory(path.resolve(fixturesPath, 'safe-index'))).to.equal(true);
            });
        });
        context('unsafe', () => {
            it('throws an error', () => {
                expect(() => {
                    validateTargetDirectory(path.resolve(fixturesPath, 'unsafe-index'));
                }).to.throw(Error, '"' + path.resolve(fixturesPath, 'unsafe-index/index.js') + '" unsafe index.');
            });
        });
    });
});
