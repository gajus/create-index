import _ from 'lodash';
import createIndexCode from './createIndexCode';
import fs from 'fs';
import path from 'path';
import validateTargetDirectory from './validateTargetDirectory';
import readDirectory from './readDirectory';
import sortByDepth from './sortByDepth';

export default (directoryPaths) => {
    const sortedDirectoryPaths = sortByDepth(directoryPaths);

    _.forEach(sortedDirectoryPaths, (directoryPath) => {
        validateTargetDirectory(directoryPath);
    });

    _.forEach(sortedDirectoryPaths, (directoryPath) => {
        const siblings = readDirectory(directoryPath);
        const indexCode = createIndexCode(siblings);
        const indexFilePath = path.resolve(directoryPath, 'index.js');

        fs.writeFileSync(indexFilePath, indexCode);
    });
};
