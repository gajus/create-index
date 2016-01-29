import _ from 'lodash';
import glob from 'glob';
import path from 'path';
import validateTargetDirectory from './validateTargetDirectory';

export default (directoryPath) => {
    let targetDirectories;

    targetDirectories = glob.sync(path.join(directoryPath, './**/index.js'));

    targetDirectories = _.filter(targetDirectories, (targetDirectoryPath) => {
        try {
            validateTargetDirectory(path.dirname(targetDirectoryPath));

            return true;
        /* eslint-disable no-empty */
        } catch (error) {

        }
        /* eslint-enable no-empty */

        return false;
    });

    targetDirectories = _.map(targetDirectories, path.dirname);

    return targetDirectories;
};
