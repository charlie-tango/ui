# Charlie Tango UI

[![Version Badge][npm-version-svg]][package-url] [![dependency status][deps-svg]][deps-url]
[![dev dependency status][dev-deps-svg]][dev-deps-url] [![License][license-image]][license-url]
[![styled with prettier][prettier-svg]][prettier-url]

A set of UI components built with [Emotion](https://emotion.sh) and
[styled-system](https://styled-system.com/), to be used between Charlie Tango projects.

It's built for Emotion 11 _(still in beta, but should be finalized soon)_, so it can be used with
the `@emotion/react` package.

## Installation

```bash
yarn add @charlietango/ui @emotion/react
```

### @charlietango/babel-preset-sx-prop

You should add
[@charlietango/babel-preset-sx-prop](https://www.npmjs.com/package/@charlietango/babel-preset-sx-prop)
to enable full support for the `sx` prop. This is a custom version of
[@emotion/babel-preset-css-prop](https://emotion.sh/docs/@emotion/babel-preset-css-prop), and
replaces it (still includes support for the `css` prop).

```bash
yarn add @charletango/babel-preset-sx-prop --dev
```

Add the preset to the project **.babelrc**

```json
{
  "presets": ["@charlietango/babel-preset-sx-prop"]
}
```

### Planned components

| **Component**  | **Status** |
| -------------- | ---------- |
| Accordion      | Todo       |
| Tabs           | Todo       |
| Modal          | ✅         |
| VisuallyHidden | ✅         |


### Related libraries

- [emotion](https://emotion.sh)
- [styled-system](https://styled-system.com/)

## Contributing

### Storybook development

All the components should be documented using Storybook. We are using the Storybook MDX format to
ensure we have examples alongside the documentation.

### Testing in another project

You can use [`yarn link`](https://yarnpkg.com/lang/en/docs/cli/link/) to test changes to the library
in another one of your projects.

In the `charlie-tango/ui` project run:

```shell script
yarn link
yarn dev:watch
```

In the consuming test project, link the project:

```shell script
yarn link "@charlietango/ui"
```

You will now be able to see changes immediately.

### Publish

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
