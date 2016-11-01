import fs from 'fs';
import path from 'path';
import _ from 'lodash';

export default (targetDirectory) => {
  let stats;

  try {
    stats = fs.statSync(targetDirectory);
  } catch (error) {
    throw new Error('Directory "' + targetDirectory + '" does not exist.');
  }

  if (!stats.isDirectory()) {
    throw new Error('"' + targetDirectory + '" is not a directory.');
  }

  const indexFilePath = path.resolve(targetDirectory, './index.js');

  try {
    fs.statSync(indexFilePath);
  } catch (error) {
    return true;
  }

  const indexFile = fs.readFileSync(indexFilePath, 'utf8');

  if (!_.startsWith(indexFile, '\'create index\';\n')) {
    throw new Error('"' + indexFilePath + '" unsafe index.');
  }

  return true;
};
