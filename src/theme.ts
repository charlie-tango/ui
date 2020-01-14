import { Theme } from 'styled-system';
import { SystemStyleObject } from '@styled-system/css';

export interface UITheme extends Theme {
  layout?: {
    container?: SystemStyleObject;
  };
  grids?: {
    [key: string]: SystemStyleObject | undefined;
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
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64],
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
};

export default baseTheme;
