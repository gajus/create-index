import _ from 'lodash';
import createIndexCode from './createIndexCode';
import fs from 'fs';
import path from 'path';
import validateTargetDirectory from './validateTargetDirectory';
import readDirectory from './readDirectory';
import sortByDepth from './sortByDepth';

export default (directoryPaths) => {
    let sortedDirectoryPaths;

    sortedDirectoryPaths = sortByDepth(directoryPaths);

    _.forEach(sortedDirectoryPaths, (directoryPath) => {
        validateTargetDirectory(directoryPath);
    });

    _.forEach(sortedDirectoryPaths, (directoryPath) => {
        let indexCode,
            indexFilePath,
            siblings;

        siblings = readDirectory(directoryPath);

        indexCode = createIndexCode(siblings);

        indexFilePath = path.resolve(directoryPath, 'index.js');

        fs.writeFileSync(indexFilePath, indexCode);
    });
};
