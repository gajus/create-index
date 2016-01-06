import _ from 'lodash';
import fs from 'fs';
import path from 'path';

export default (targetDirectory) => {
    let indexFile,
        indexFilePath,
        stats;

    try {
        stats = fs.statSync(targetDirectory);
    } catch (error) {
        throw new Error('Directory "' + targetDirectory + '" does not exist.');
    }

    if (!stats.isDirectory()) {
        throw new Error('"' + targetDirectory + '" is not a directory.');
    }

    indexFilePath = path.resolve(targetDirectory, './index.js');

    try {
        fs.statSync(indexFilePath);
    } catch (error) {
        return true;
    }

    indexFile = fs.readFileSync(indexFilePath, 'utf8');

    if (!_.startsWith(indexFile, '\'create index\';\n')) {
        throw new Error('"' + indexFilePath + '" unsafe index.');
    }

    return true;
};
