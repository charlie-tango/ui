import React from 'react';
import { ThemeProvider } from '@emotion/react';
import { DocsContainer } from '@storybook/addon-docs/dist/blocks';
import { addDecorator, addParameters } from '@storybook/react';

import { BaseCss } from "../src";
import base from '../src/theme';
import theme from './ct-theme';

const previewTheme = {
  ...base,
  dialog: {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1,
    },
    backdrop: {
      bg: 'rgba(0,0,0,0.5)',
    },
    content: {
      bg: 'white',
      p: 3,
      borderRadius: 4,
    },
  },
  buttons: {
    primary: {
      background: 'rgb(51,51,51)',
      color: 'white',
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

addDecorator((storyFn) => <ThemeProvider theme={previewTheme}>{storyFn()}</ThemeProvider>);
