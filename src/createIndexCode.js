import _ from 'lodash';

let buildExportBlock,
    buildImportBlock,
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

buildImportBlock = (files) => {
    let importBlock;

    importBlock = _.map(files, (fileName) => {
        return 'import ' + safeVariableName(fileName) + ' from \'./' + fileName + '\';';
    });

    importBlock = importBlock.join('\n');

    return importBlock;
};

buildExportBlock = (files) => {
    let exportBlock;

    exportBlock = _.map(files, (fileName) => {
        return '    ' + safeVariableName(fileName);
    });

    exportBlock = 'export {\n' + exportBlock.join(',\n') + '\n};';

    return exportBlock;
};

export default (filePaths) => {
    let code,
        sortedFilePaths;

    code = '\'create index\';\n\n';

    if (filePaths.length) {
        sortedFilePaths = filePaths.sort();

        code += buildImportBlock(sortedFilePaths) + '\n\n' + buildExportBlock(sortedFilePaths) + '\n\n';
    }

    return code;
};
