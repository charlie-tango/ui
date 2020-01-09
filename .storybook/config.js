import { addDecorator, addParameters } from '@storybook/react';
import React from 'react';
import { DocsContainer } from '@storybook/addon-docs/dist/blocks';
import { ThemeProvider } from 'emotion-theming';
import base from '../src/theme';
import theme from './ct-theme';

addParameters({
  options: {
    theme,
    isFullscreen: false,
    panelPosition: 'bottom',
  },
  docs: {
    container: ({ children, context }) => (
      <DocsContainer context={context}>
        <ThemeProvider theme={base}>{children}</ThemeProvider>
      </DocsContainer>
    ),
  },
});

addDecorator(storyFn => (
  <ThemeProvider theme={base}>{storyFn()}</ThemeProvider>
));
