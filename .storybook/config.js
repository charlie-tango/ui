import { addDecorator, addParameters } from '@storybook/react';
import React from 'react';
import { DocsContainer } from '@storybook/addon-docs/dist/blocks';
import { ThemeProvider } from 'emotion-theming';
import base from '../src/theme';
import theme from './ct-theme';
import { BaseCss } from '../src/BaseCss';

const previewTheme = {
  ...base,
  buttons: {
    primary: {
      background: 'rgb(51,51,51)',
      color: 'white'
    },
  },
};

addParameters({
  options: {
    theme,
    isFullscreen: false,
    panelPosition: 'bottom',
    showRoots: true,
  },
  docs: {
    container: ({ children, context }) => (
      <DocsContainer context={context}>
        <ThemeProvider theme={previewTheme}>
          <BaseCss />
          {children}
        </ThemeProvider>
      </DocsContainer>
    ),
  },
});

addDecorator(storyFn => <ThemeProvider theme={previewTheme}>{storyFn()}</ThemeProvider>);
