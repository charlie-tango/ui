# Charlie Tango UI

[![Version Badge][npm-version-svg]][package-url] [![dependency status][deps-svg]][deps-url]
[![dev dependency status][dev-deps-svg]][dev-deps-url] [![License][license-image]][license-url]
[![styled with prettier][prettier-svg]][prettier-url]

## Installation

Install using [Yarn](https://yarnpkg.com):

```sh
yarn add @charlietango/ui
```

or NPM:

```sh
npm install @charlietango/ui
```

The library is built for **ESNext**, and will need to be processed by the consuming applications
bundler.

#### Webpack

Include the `@charlietango` namespace in the `babel-loader` rule:

```js
const config = {
  modules: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        include: [path.resolve('src'), path.resolve('node_modules/@charlietango')],
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: DEBUG,
            },
          },
        ],
      },
    ],
  },
};
```

#### Jest

Jest will also need to include the library when transforming files:

```js
const config = { transformIgnorePatterns: ['/node_modules/(?!@charlietango).+\\.js$'] };
```

### Related libraries

- [styled-system](https://styled-system.com/)

## Publish

We are using [semantic-release](https://github.com/semantic-release/semantic-release) to
automatically publish a new package, whenever we merge to `master`. It's important to use the
[Angular Commit Message Conventions](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines)
so the version can be correctly bumped.

[package-url]: https://npmjs.org/package/@charlietango/ui
[npm-version-svg]: https://img.shields.io/npm/v/@charlietango/ui.svg
[deps-svg]: https://david-dm.org/charlie-tango/ui.svg
[deps-url]: https://david-dm.org/charlie-tango/ui
[dev-deps-svg]: https://david-dm.org/charlie-tango/ui/dev-status.svg
[dev-deps-url]: https://david-dm.org/charlie-tango/ui#info=devDependencies
[license-image]: http://img.shields.io/npm/l/@charlietango/ui.svg
[license-url]: LICENSE
[prettier-svg]: https://img.shields.io/badge/styled_with-prettier-ff69b4.svg
[prettier-url]: https://github.com/prettier/prettier
