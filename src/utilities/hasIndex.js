import fs from 'fs';
import path from 'path';

export default (directoryPath) => {
  const indexPath = path.resolve(directoryPath, 'index.js');

  try {
    fs.statSync(indexPath);

    return true;
  } catch (error) {
    return false;
  }
};
