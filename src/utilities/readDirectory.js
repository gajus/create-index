import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import validateTargetDirectory from './validateTargetDirectory';

const hasIndex = (directoryPath) => {
  const indexPath = path.resolve(directoryPath, 'index.js');

  try {
    fs.statSync(indexPath);

    return true;
  } catch (error) {
    return false;
  }
};

const hasNoExtension = (fileName) => {
  const matches = fileName.match(/\./g);

  return !matches;
};

const hasMultipleExtensions = (fileName) => {
  const matches = fileName.match(/\./g);

  return matches && matches.length > 1;
};

const isSafeName = (fileName) => {
  return /^[a-z][a-z0-9._]+$/i.test(fileName);
};

const removeDuplicates = (files) => {
  return _.filter(files, (fileName) => {
    return !_.includes(files, fileName + '.js');
  });
};

export default (directoryPath, options = {}) => {
  let children;

  if (!validateTargetDirectory(directoryPath, {silent: options.silent})) {
    return false;
  }

  children = fs.readdirSync(directoryPath);

  children = _.filter(children, (fileName) => {
    const absolutePath = path.resolve(directoryPath, fileName);
    const isDirectory = fs.statSync(absolutePath).isDirectory();

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
