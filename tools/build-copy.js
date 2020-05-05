const fs = require('fs');
const path = require('path');
const pck = require('../package');
const rootDir = path.resolve(__dirname, '../');
const srcDir = path.resolve(__dirname, '../src');
const distDir = path.resolve(__dirname, '../dist');
const globby = require('globby');

const filesToCopy = ['package.json', 'README.md', 'LICENSE'];
filesToCopy.forEach((file) => {
  fs.copyFileSync(path.resolve(rootDir, file), path.resolve(distDir, file));
});

const srcFilesToCopy = globby.sync('**/*.d.ts', { cwd: srcDir, ignore: 'react-app-env.d.ts' });
srcFilesToCopy.forEach((file) => {
  fs.copyFileSync(path.resolve(srcDir, file), path.resolve(distDir, file));
});

const packageFieldsToRemove = [
  'private',
  'devDependencies',
  'optionalDependencies',
  'lint-staged',
  'scripts',
  'husky',
  'prettier',
  'jest',
  'eslintConfig',
  'eslintIgnore',
  'files',
];

packageFieldsToRemove.forEach((field) => {
  delete pck[field];
});

pck.main = pck.main.replace('dist/', '');
pck.module = pck.module.replace('dist/', '');
pck.typings = pck.typings.replace('dist/', '');

fs.writeFileSync(path.resolve(distDir, 'package.json'), JSON.stringify(pck, undefined, 2), 'utf-8');
