const path = require('path');

module.exports = {
  stories: ['../docs/**/*.mdx', '../src/**/*.@(story|stories).@(ts|tsx|js|jsx|mdx)'],
  addons: ['@storybook/addon-essentials'],
};
