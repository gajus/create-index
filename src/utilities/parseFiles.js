import fs from 'fs';
import path from 'path';
import {parse} from 'babylon';
import {simple} from 'babylon-walk';

export default (fileNames, directory) => {
  const cwd = process.cwd();

  return fileNames.map((fileName) => {
    let absolutePath;

    if (path.isAbsolute(fileName)) {
      absolutePath = fileName;
    } else {
      if (directory) {
        absolutePath = path.join(directory, fileName);
      } else {
        throw new Error('Require base directory for non-absolute fileNames');
      }

      if (!path.isAbsolute(absolutePath)) {
        absolutePath = path.join(cwd, absolutePath);
      }
    }

    if (fs.statSync(absolutePath).isDirectory()) {
      absolutePath = path.join(absolutePath, 'index.js');
    }

    const code = fs.readFileSync(absolutePath, 'utf8');

    const ast = parse(code, {
      sourceType: 'module'
    });

    let containsDefaultExport;

    simple(ast, {
      ExportDefaultDeclaration () {
        containsDefaultExport = true;
      }
    });

    return {
      containsDefaultExport,
      fileName
    };
  });
};
