import { create } from '@storybook/theming';

export default create({
  base: 'light',
  brandTitle: 'Charlie Tango UI',
  brandUrl: 'https://github.com/charlie-tango/ui',
  brandImage: 'CT_Logo.svg',

  // UI
  appBg: '#f5f5f5',
  textColor: '#1a1a1a',

  colorPrimary: '#2112e6',
  colorSecondary: '#ff6350',

  // Typography
  fontBase: [
    '-apple-system',
    '".SFNSText-Regular"',
    '"San Francisco"',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    '"Helvetica Neue"',
    'Helvetica',
    'Arial',
    'sans-serif',
  ].join(', '),

  fontCode: [
    '"Fira Code Retina"',
    '"Fira Code"',
    '"FiraCode-Retina"',
    '"Andale Mono"',
    '"Lucida Console"',
    'Consolas',
    'Monaco',
    'monospace',
  ].join(', '),
});
