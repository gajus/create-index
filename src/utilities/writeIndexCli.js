import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import chalk from 'chalk';
import createIndexCode from './createIndexCode';
import validateTargetDirectory from './validateTargetDirectory';
import readDirectory from './readDirectory';
import sortByDepth from './sortByDepth';
import log from './log';
import findIndexFiles from './findIndexFiles';

export default (directoryPaths, options = {}) => {
  let sortedDirectoryPaths;

  sortedDirectoryPaths = sortByDepth(directoryPaths);

  log('Target directories', sortedDirectoryPaths);
  if (options.updateIndex) {
    log('Update index:', options.updateIndex ? chalk.green('true') : chalk.red('false'));
  } else {
    log('Recursive:', options.ignoreUnsafe ? chalk.green('true') : chalk.red('false'));
    log('Ignore unsafe:', options.ignoreUnsafe ? chalk.green('true') : chalk.red('false'));
  }

  if (options.updateIndex || options.recursive) {
    sortedDirectoryPaths = _.map(sortedDirectoryPaths, (dir) => {
      return findIndexFiles(dir, {
        fileName: options.updateIndex ? 'index.js' : '*',
        silent: options.updateIndex || options.ignoreUnsafe
      });
    });
    sortedDirectoryPaths = _.flatten(sortedDirectoryPaths);
    sortedDirectoryPaths = _.uniq(sortedDirectoryPaths);
    sortedDirectoryPaths = sortByDepth(sortedDirectoryPaths);

    log('Updating index files in:', sortedDirectoryPaths.reverse().join(', '));
  }

  sortedDirectoryPaths = sortedDirectoryPaths.filter((directoryPath) => {
    return validateTargetDirectory(directoryPath, {silent: options.ignoreUnsafe});
  });

  _.forEach(sortedDirectoryPaths, (directoryPath) => {
    let existingIndexCode;

    const siblings = readDirectory(directoryPath, {silent: options.ignoreUnsafe});

    const indexCode = createIndexCode(siblings, {
      banner: options.banner
    });

    const indexFilePath = path.resolve(directoryPath, 'index.js');

    try {
      existingIndexCode = fs.readFileSync(indexFilePath, 'utf8');

        /* eslint-disable no-empty */
    } catch (error) {

    }

        /* eslint-enable no-empty */

    fs.writeFileSync(indexFilePath, indexCode);

    if (existingIndexCode && existingIndexCode === indexCode) {
      log(indexFilePath, chalk.yellow('[index have not changed]'));
    } else if (existingIndexCode && existingIndexCode !== indexCode) {
      log(indexFilePath, chalk.green('[updated index]'));
    } else {
      log(indexFilePath, chalk.green('[created index]'));
    }
  });

  log('Done');
};
