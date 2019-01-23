import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import hasIndex from './hasIndex';
import validateTargetDirectory from './validateTargetDirectory';

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

const stripExtension = (fileName) => {
  const pos = fileName.lastIndexOf('.');

  if (pos === -1) {
    return fileName;
  }

  return fileName.substr(0, pos);
};

const removeDuplicates = (files, preferredExtension) => {
  return _.filter(files, (fileName) => {
    const withoutExtension = stripExtension(fileName);
    const mainAlternative = withoutExtension + '.' + preferredExtension;

    if (mainAlternative === fileName) {
      return true;
    }

    return !_.includes(files, mainAlternative);
  });
};

const removeIgnoredFiles = (files, ignorePatterns = []) => {
  if (ignorePatterns.length === 0) {
    return files;
  }

  const patterns = ignorePatterns.map((pattern) => {
    if (_.startsWith(pattern, '/') && _.endsWith(pattern, '/')) {
      const patternWithoutSlashes = pattern.slice(1, -1);

      return new RegExp(patternWithoutSlashes);
    }

    return new RegExp(pattern);
  });

  return _.filter(files, (fileName) => {
    let pattern;

    for (pattern of patterns) {
      if (fileName.match(pattern) !== null) {
        return false;
      }
    }

    return true;
  });
};

export default (directoryPath, options = {}) => {
  if (!validateTargetDirectory(directoryPath, {silent: options.silent})) {
    return false;
  }

  const {
    extensions = ['js'],
    config = {},
    ignoreDirs = false
  } = options;

  let children;

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

    if (!isDirectory && !extensions.some((ext) => {
      return _.endsWith(fileName, '.' + ext);
    })) {
      return false;
    }

    if (isDirectory && (!hasIndex(absolutePath) || ignoreDirs)) {
      return false;
    }

    return true;
  });

  children = removeDuplicates(children, extensions[0]);
  children = removeIgnoredFiles(children, config.ignore);

  return children.sort();
};
