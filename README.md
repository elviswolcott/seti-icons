[![Travis (.com)](https://img.shields.io/travis/com/elviswolcott/seti-ui?logo=travis)](https://travis-ci.com/elviswolcott/seti-ui)
[![npm](https://img.shields.io/npm/v/seti-icons?label=seti-icons&logo=npm)](https://www.npmjs.com/package/seti-icons)
# seti-icons

> File icons from Seti-UI

All of the icons come from [jesseweed/seti-ui](https://github.com/jesseweed/seti-ui). 
This repo just packages them up so you can use them with `npm install`.

## Available Scripts

In the project directory, you can run:

### `npm run build`

Builds the package using typescript into `./lib`

### `npm test`

Launches the Jest to run tests.

### `npm run lint`

Checks code for style issues and syntax errors with TSLint and Prettier.

### `npm run lint:fix`

Checks code for style issues and syntax errors with TSLint and Prettier, attempting to fix them when possible.

## Publishing a new version

Travis is configured to run deploys on tags.

## Initial Setup

1. Edit `.travis.yml` so the repository and npm credentials match your project
    * Encrypting your NPM token requires the Travis CLI
