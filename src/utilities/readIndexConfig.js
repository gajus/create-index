import fs from 'fs';
import path from 'path';
import hasIndex from './hasIndex';
import {CREATE_INDEX_PATTERN} from './constants';

export default (directoryPath) => {
  if (!hasIndex(directoryPath)) {
    return {};
  }

  const indexPath = path.resolve(directoryPath, 'index.js');
  const indexContents = fs.readFileSync(indexPath, 'utf-8');
  const found = indexContents.match(CREATE_INDEX_PATTERN);
  const configLine = typeof found[1] === 'string' ? found[1].trim() : '';

  if (configLine.length === 0) {
    return {};
  }

  let config;

  try {
    config = JSON.parse(configLine);
  } catch (error) {
    throw new Error(
      '"' + indexPath + '" contains invalid configuration object.\n' +
      'Configuration object must be a valid JSON.'
    );
  }

  return config;
};
