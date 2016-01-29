import _ from 'lodash';

let buildExportBlock,
    safeVariableName;

safeVariableName = (fileName) => {
    let indexOfDot;

    indexOfDot = fileName.indexOf('.');

    if (indexOfDot === -1) {
        return fileName;
    } else {
        return fileName.slice(0, indexOfDot);
    }
};

buildExportBlock = (files) => {
    let importBlock;

    importBlock = _.map(files, (fileName) => {
        return 'export ' + safeVariableName(fileName) + ' from \'./' + fileName + '\';';
    });

    importBlock = importBlock.join('\n');

    return importBlock;
};

export default (filePaths) => {
    let code,
        sortedFilePaths;

    code = '\'create index\';\n\n';

    if (filePaths.length) {
        sortedFilePaths = filePaths.sort();

        code += buildExportBlock(sortedFilePaths) + '\n\n';
    }

    return code;
};
