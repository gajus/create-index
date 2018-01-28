import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import createIndexCode from './createIndexCode';
import validateTargetDirectory from './validateTargetDirectory';
import readDirectory from './readDirectory';
import readIndexConfig from './readIndexConfig';
import sortByDepth from './sortByDepth';
import exportNamedIndex from './exportNamedIndex';

export default (directoryPaths, options = {}, templateFunction = exportNamedIndex) => {
  const sortedDirectoryPaths = sortByDepth(directoryPaths)
    .filter((directoryPath) => {
      return validateTargetDirectory(directoryPath, {silent: options.ignoreUnsafe});
    });

  _.forEach(sortedDirectoryPaths, (directoryPath) => {
    const config = readIndexConfig(directoryPath);
    const optionsWithConfig = Object.assign({}, options, {config});
    const siblings = readDirectory(directoryPath, optionsWithConfig);
    const indexCode = createIndexCode(siblings, optionsWithConfig, templateFunction);
    const indexFilePath = path.resolve(directoryPath, 'index.js');

    fs.writeFileSync(indexFilePath, indexCode);
  });
};
