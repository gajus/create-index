import fs from 'fs';
import path from 'path';

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

  const indexFilePath = path.resolve(targetDirectory, './index.js');

  try {
    fs.statSync(indexFilePath);
  } catch (error) {
    return true;
  }

  const indexFile = fs.readFileSync(indexFilePath, 'utf8');

  if (!indexFile.match(/(?:^|[\n\r]+)\/\/ @create-index[\n\r]+/)) {
    if (silent) {
      return false;
    } else {
      throw new Error('"' + indexFilePath + '" unsafe index.');
    }
  }

  return true;
};

