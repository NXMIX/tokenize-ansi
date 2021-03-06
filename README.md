# tokenize-ansi

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Build Status](https://travis-ci.org/NXMIX/tokenize-ansi.svg)](https://travis-ci.org/NXMIX/tokenize-ansi)
[![Coverage Status](https://coveralls.io/repos/github/NXMIX/tokenize-ansi/badge.svg)](https://coveralls.io/github/NXMIX/tokenize-ansi)
[![npm](https://img.shields.io/npm/v/@nxmix/tokenize-ansi.svg)](https://www.npmjs.com/package/@nxmix/tokenize-ansi/) [![Greenkeeper badge](https://badges.greenkeeper.io/NXMIX/tokenize-ansi.svg)](https://greenkeeper.io/)

> tokenize a string that includes ansi code.

## Usage

### install
```bash
npm install @nxmix/tokenize-ansi
```

### example

```js
import tokenize from '@nxmix/tokenize-ansi'

tokenize("\x1b1A");
// => [ ["up", 1] ], cursor moves up one line

tokenize("\x1b31m" + "a");
// => [ ["red"], ["text", "a"] ], red text

tokenize("\x1b38;2;123,45,67m" + "a");
// => [ ["moreColor", 2, 123, 45, 67], ["text", "a"] ], true-color text

tokenize("\x1b25h");
// => [ ["cursor-on"] ], show cursor
```

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind are welcome!
