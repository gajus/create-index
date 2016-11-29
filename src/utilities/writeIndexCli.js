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
  log('Update index:', options.updateIndex ? chalk.green('true') : chalk.red('false'));

  if (options.updateIndex) {
    sortedDirectoryPaths = _.map(sortedDirectoryPaths, findIndexFiles);
    sortedDirectoryPaths = _.flatten(sortedDirectoryPaths);
    sortedDirectoryPaths = _.uniq(sortedDirectoryPaths);
    sortedDirectoryPaths = sortByDepth(sortedDirectoryPaths);

    log('Found index file in:', sortedDirectoryPaths);
  }

  _.forEach(sortedDirectoryPaths, (directoryPath) => {
    validateTargetDirectory(directoryPath);
  });

  _.forEach(sortedDirectoryPaths, (directoryPath) => {
    let existingIndexCode;

    const siblings = readDirectory(directoryPath);

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
