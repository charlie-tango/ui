import { Theme } from 'styled-system';
import { SystemStyleObject } from '@styled-system/css';
import { GridCols } from './Grid';

export interface UITheme extends Theme {
  layout?: {
    container?: SystemStyleObject;
  };
  dialog?: {
    container?: SystemStyleObject;
    backdrop?: SystemStyleObject;
    content?: SystemStyleObject;
  };
  grids?: {
    [key: string]: SystemStyleObject & { gridColumns?: GridCols | GridCols[] } | undefined;
  };
  variants?: {
    [key: string]: SystemStyleObject | undefined;
  };
  text: {
    [key: string]: SystemStyleObject | undefined;
  };
}

export const baseTheme: UITheme = {
  breakpoints: [
    '48em', // 768px - Tablets portrait and above
    '62em', // 992px - Tablets landscape and above
    '80em', // 1280px - Desktops up to 13' and above
    '90em', // 1440px - Max width, desktops HD and above
  ],
  space: [0, 4, 8, 16, 20, 24, 32, 40, 48, 64],
  fontSizes: [
    '0.75rem', // 12px
    '0.875rem', // 14px
    '1rem', // 16px
    '1.25rem', // 20px
    '1.5rem', //24px
    '1.75rem', //28px
    '2rem', // 32px
    '2.5rem', // 40px,
    '3rem', // 48px,
    '4rem', // 64px,
  ],
  fonts: {
    body: `-apple-system, '.SFNSText-Regular', 'San Francisco', BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Helvetica, Arial, sans-serif;`,
    heading: 'body',
    mono: `SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace`,
  },
  text: {},
  sizes: {
    container: 1280,
  },
  layout: {
    container: {
      px: 4,
    },
  },
  dialog: {
    container: {
      zIndex: 1,
    },
    backdrop: {
      background: `rgba(0,0,0,0.3)`,
    },
  },
};

export default baseTheme;
