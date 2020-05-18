import path from 'path';
import {
  expect,
} from 'chai';
import readIndexConfig from '../src/utilities/readIndexConfig';

const fixtures = {
  noIndex: path.resolve(__dirname, 'fixtures/read-index-config/no-index'),
  withConfig: path.resolve(__dirname, 'fixtures/read-index-config/with-config'),
  withInvalidConfig: path.resolve(__dirname, 'fixtures/read-index-config/with-invalid-config'),
  withoutConfig: path.resolve(__dirname, 'fixtures/read-index-config/without-config'),
};

const expectedValues = {
  noIndex: {},
  withConfig: {
    ignore: ['/foo.js$/'],
  },
  withoutConfig: {},
};

describe('readIndexConfig()', () => {
  context('When valid config is defined', () => {
    it('reads config object', () => {
      const config = readIndexConfig(fixtures.withConfig);

      expect(config).to.deep.equal(expectedValues.withConfig);
    });
  });

  context('When invalid config is defined', () => {
    it('should throw an error', () => {
      const wrappedReadIndexConfig = () => {
        readIndexConfig(fixtures.withInvalidConfig);
      };

      expect(wrappedReadIndexConfig).to.throw(/Configuration object must be a valid JSON./);
    });
  });

  context('When config is NOT defined', () => {
    it('returns an empty object', () => {
      const config = readIndexConfig(fixtures.withoutConfig);

      expect(config).to.deep.equal(expectedValues.withoutConfig);
    });
  });

  context('When index file doesn\'t exist', () => {
    it('returns an empty object', () => {
      const config = readIndexConfig(fixtures.withoutConfig);

      expect(config).to.deep.equal(expectedValues.noIndex);
    });
  });
});
