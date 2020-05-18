import fs from 'fs';
import path from 'path';
import {CREATE_INDEX_PATTERN} from './constants';

export default (targetDirectory, options = {}) => {
  const silent = options.silent;
  let stats;

  try {
    stats = fs.statSync(targetDirectory);
  } catch (error) {
    if (silent) {
      return false;
    } else {
      throw new Error('Directory "' + targetDirectory + '" does not exist.');
    }
  }

  if (!stats.isDirectory()) {
    if (silent) {
      return false;
    } else {
      throw new Error('"' + targetDirectory + '" is not a directory.');
    }
  }

  const indexFilePath = path.resolve(targetDirectory, './' + (options.outputFile || 'index.js'));

  try {
    fs.statSync(indexFilePath);
  } catch (error) {
    return true;
  }

  const indexFile = fs.readFileSync(indexFilePath, 'utf8');

  if (!indexFile.match(CREATE_INDEX_PATTERN)) {
    if (silent) {
      return false;
    } else {
      throw new Error('"' + indexFilePath + '" unsafe index.');
    }
  }

  return true;
};

