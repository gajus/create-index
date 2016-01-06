# create-index

[![NPM version](http://img.shields.io/npm/v/create-index.svg?style=flat-square)](https://www.npmjs.org/package/create-index)
[![Travis build status](http://img.shields.io/travis/gajus/create-index/master.svg?style=flat-square)](https://travis-ci.org/gajus/create-index)
[![js-canonical-style](https://img.shields.io/badge/code%20style-canonical-blue.svg?style=flat-square)](https://github.com/gajus/canonical)

`create-index` program creates ES6 `./index.js` file in target directories that imports and exports all sibling files and directories.

## Implementation

`create-index` program will look into the target directory.

If there is no `./index.js`, it will create a new file, e.g.

```js
'create index';
```

Created index file must start with `'create index';\n\n`. This is used to make sure that `create-index` does not accidentally overwrite your local files.

If there are sibling files, index file will import them and export, e.g.

```sh
children-directories-and-files git:(master) ✗ ls -lah
total 0
drwxr-xr-x   5 gajus  staff   170B  6 Jan 15:39 .
drwxr-xr-x  10 gajus  staff   340B  6 Jan 15:53 ..
drwxr-xr-x   2 gajus  staff    68B  6 Jan 15:29 bar
drwxr-xr-x   2 gajus  staff    68B  6 Jan 15:29 foo
-rw-r--r--   1 gajus  staff     0B  6 Jan 15:29 foo.js
```

Given the above directory contents, index will be:

```js
'create index';

import bar from './bar';
import foo from './foo.js';

export {
    bar,
    foo
};
```

If there are files with the same name as directories in the same directory, file will take precedence.

Directories that do not have `./index.js` in themselves will be excluded.

## Using CLI Program

```sh
create-index ./directory1 ./directory2 ./directory3 ...
```

## Using `create-index` Programmatically

```js
import {
    writeIndex
} from 'create-index';

/**
 * @type {Function}
 * @param {Array<string>} directoryPaths
 * @throws {Error} Directory "..." does not exist.
 * @throws {Error} "..." is not a directory.
 * @throws {Error} "..." unsafe index.
 * @returns {boolean}
 */
writeIndex;
```
