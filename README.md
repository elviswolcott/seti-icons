[![Travis (.com)](https://img.shields.io/travis/com/<user>/<repo>?logo=travis)](https://travis-ci.com/<user>/<repo>)
[![npm](https://img.shields.io/npm/v/<package>?label=<package>&logo=npm)](https://www.npmjs.com/package/<package>)
# <package-name>

> tagline

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

1. Edit `README.md` so the badges point to your repository
1. Edit `.travis.yml` so the repository and npm credentials match your project
    * Encrypting your NPM token requires the Travis CLI
1. Edit `package.json` so that the package name, author, and repository match your project
1. Disable `build config validation` in the Travis CI settings for the repository
