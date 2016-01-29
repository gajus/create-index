import _ from 'lodash';
import createIndexCode from './createIndexCode';
import fs from 'fs';
import path from 'path';
import validateTargetDirectory from './validateTargetDirectory';
import readDirectory from './readDirectory';
import sortByDepth from './sortByDepth';
import log from './log';
import chalk from 'chalk';

export default (directoryPaths) => {
    let sortedDirectoryPaths;

    sortedDirectoryPaths = sortByDepth(directoryPaths);

    log('Target directories', sortedDirectoryPaths);

    _.forEach(sortedDirectoryPaths, (directoryPath) => {
        validateTargetDirectory(directoryPath);
    });

    _.forEach(sortedDirectoryPaths, (directoryPath) => {
        let existingIndexCode,
            indexCode,
            indexFilePath,
            siblings;

        siblings = readDirectory(directoryPath);

        indexCode = createIndexCode(siblings);

        indexFilePath = path.resolve(directoryPath, 'index.js');

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
