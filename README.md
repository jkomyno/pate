# pate

Modern and light-fast CLI app that scans all the desired files of a certain folder and returns a list with the name of the files which contain a RegEx pattern.

--------------------------------

[![Travis](https://img.shields.io/travis/jkomyno/pate.svg?branch=master)](https://travis-ci.org/jkomyno/pate)
[![npm](https://img.shields.io/npm/v/pate.svg)](https://npmjs.com/package/pate)
[![npm](https://img.shields.io/npm/dm/pate.svg)](https://npmjs.com/package/pate)
[![codecov](https://codecov.io/gh/jkomyno/pate/branch/master/graph/badge.svg)](https://codecov.io/gh/jkomyno/pate)  

- [Overview](#overview)
- [Installation](#installation)
- [Motivation](#motivation)
- [CLI](#cli)
  - [Usage](#usage)
  - [Examples](#examples)
- [Contributing](#contributing)
  - [Development Scripts](#development-scripts)
  - [Build Note](#build-note)
- [Other links](#other-links)
- [Credits](#credits)
- [License](#license)

## Overview

**pate** is a library that, given a RegExp pattern and a folder path, filters out every nested file in that folder
which doesn't match the pattern. Optionally it's possible either to write the list of files that match to a file,
to log every single action that's happening internally, or even to filter the files via a glob pattern.

Currently it isn't fully tested, so I'd be glad to receive PRs that enhance the current test suite.

It requires at least NodeJS 8.5.0 installed.
To the Windows users: the CLI app has a better UX if you use Git Bash.

## Installation

To install the library:

With yarn:

- `yarn add pate`

Or, with npm:

- `npm i -S pate`

To install the CLI app:

With yarn:

- `yarn global add pate`

Or, with npm:

- `npm i -g pate`

## Motivation

I wanted to demonstrate a non-trivial use case for NodeJS' WriteStream and ReadStream API, while writing a solid
and extensible library which might be actually useful for somebody. Also, I wanted it to be as fast as possible, and I also took time to make the command line interface to be as user friendly as possible.

## CLI

### Usage

`$ pate --help` output:

```
Usage: pate [-v|--verbose] [-o|--output FILE] [-g|--glob 'glob pattern']
          [-i|--ignore 'ignore pattern'] -m [MATCHPATTERN] -p [PATH]

Options:
  --help         Show help                                             [boolean]
  --version      Show version number                                   [boolean]
  -m, --match    match pattern to look for in the files located in PATH
                                                                      [required]
  -p, --path     path where files will be collected                   [required]
  -g, --glob     Filter files in PATH via a glob pattern. Note: it needs quotes
                 to be properly parsed.                         [default: "*.*"]
  -o, --output   file which will contain the list of the files in PATH that
                 match MATCHPATTERN
  -v, --verbose  Show current operation details in real-time
                                                      [boolean] [default: false]
  -i, --ignore   pattern that defines folders or files to exclude from the
                 discovery                                 [array] [default: []]

Examples:
  pate  To look for every 'require' word in the js files inside node_modules,
        saving the result to result.txt, you'd do:

        pate -g '*.js' -o result.txt -m require -p ./node_modules

Developed by jkomyno - Copyright 2017
Submit issues at https://github.com/jkomyno/pate
```

### Examples

Note that glob patterns always require to be quoted (suggestion: use single quotes),
while match patterns only need quotes when you're using RegEx specific syntax.

> list all *md* files in *./node_modules* which contain the sequence of characters *awesome*

- `$ pate -p ./node_modules -m awesome -g '*.md' -v`

> list all **.d.ts* files in *./node_modules/@types* which contain the word *extends*

- `$ pate -p ./node_modules/@types -m 'extends\b' -g '*.d.ts' -v`

> list all **.js* files in */absolute/path* which contain the RegEx pattern *a?b+$*,
  and redirect the list to ./found.txt

-  `$ pate -p /absolute/path -m 'a?b+$' -g '*.js' -o ./found.txt`

> list all files whose extension is *js* or *ts* in *./node_modules*, which contain either the word *reduce* or *map*, redirect the list to ./found.txt while ignoring every index.js or index.ts file

-  `$ pate -p ./node_modules -m 'reduce\b|map\b' -g '*.+(js|ts)' -i '**/index.+(js|ts)' -o ./found.txt`

## Contributing

As always, contributions are always welcome, and remember:

-   ⇄ Pull requests and ★ Stars are really welcome too.
-   Just check out the dev scripts right below to get started.

### Development scripts

#### `build`

> traspiles the .ts files in ./src to a brand new ./dist folder

-   `build:watch` - run build process in watch-mode

#### `flow`

> checks if Flow definitions are written properly

#### `lint`

> checks if code conforms to linting rules (tslint)

-   `lint --fix` - will automatically fix ts files

#### `publish`

> Runs all the linting/test suites
> Creates a brand new build
> Pushes a release to npm

#### `test`

> checks if all unit tests pass (jest / ts-jest)

-   `test:watch` - run tests in watch-mode
-   `test:cov` - run tests and displays coverage

## Other links

- [Blog post on Medium.com](https://medium.com/@alberto.schiabel/introducing-pate-my-latest-open-source-side-project-12da4fccd9fc)

## Credits

- [yargs](https://github.com/yargs/yargs): awesome CLI parser for NodeJS
- [glob](https://github.com/isaacs/node-glob): shell-like match pattern for files
- [chalk](https://github.com/chalk/chalk): used to bring colorful terminal logs

## License

This project is [MIT](LICENSE) licensed.
