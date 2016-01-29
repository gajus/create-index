import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import validateTargetDirectory from './validateTargetDirectory';

let hasIndex,
    hasMultipleExtensions,
    hasNoExtension,
    isSafeName,
    removeDuplicates;

hasIndex = (directoryPath) => {
    let indexPath;

    indexPath = path.resolve(directoryPath, 'index.js');

    try {
        fs.statSync(indexPath);

        return true;
    } catch (error) {
        return false;
    }
};

hasNoExtension = (fileName) => {
    let matches;

    matches = fileName.match(/\./g);

    return !matches;
};

hasMultipleExtensions = (fileName) => {
    let matches;

    matches = fileName.match(/\./g);

    return matches && matches.length > 1;
};

isSafeName = (fileName) => {
    return /^[a-z][a-z0-9\.]+$/i.test(fileName);
};

removeDuplicates = (files) => {
    return _.filter(files, (fileName) => {
        return !_.includes(files, fileName + '.js');
    });
};

export default (directoryPath) => {
    let children;

    validateTargetDirectory(directoryPath);

    children = fs.readdirSync(directoryPath);

    children = _.filter(children, (fileName) => {
        let absolutePath,
            isDirectory;

        absolutePath = path.resolve(directoryPath, fileName);

        isDirectory = fs.statSync(absolutePath).isDirectory();

        if (!isSafeName(fileName)) {
            return false;
        }

        if (hasNoExtension(fileName) && !isDirectory) {
            return false;
        }

        if (hasMultipleExtensions(fileName)) {
            return false;
        }

        if (_.startsWith(fileName, 'index.js')) {
            return false;
        }

        if (!isDirectory && !_.endsWith(fileName, '.js')) {
            return false;
        }

        if (isDirectory && !hasIndex(absolutePath)) {
            return false;
        }

        return true;
    });

    children = removeDuplicates(children);

    return children.sort();
};
