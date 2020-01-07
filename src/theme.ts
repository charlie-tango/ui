import { Theme } from 'styled-system';
import { DefaultTheme } from 'styled-components';
import { SystemStyleObject } from '@styled-system/css';

export enum FontWeight {
  hairline = 100,
  thin = 200,
  light = 300,
  normal = 400,
  medium = 500,
  semibold = 600,
  bold = 700,
  extrabold = 800,
  black = 900,
}

export interface PresetTheme extends Theme, DefaultTheme {
  variants: {
    container?: SystemStyleObject;
    [key: string]: SystemStyleObject | undefined;
  };
}

export const baseTheme: PresetTheme = {
  breakpoints: [
    '30em', // 480px - Mobile and above
    '48em', // 768px - Tablets portrait and above
    '62em', // 992px - Tablets landscape and above
    '80em', // 1280px - Desktops up to 13' and above
    '90em', // 1440px - Max width, desktops HD and above
  ],
  space: [0, 4, 8, 15, 20, 24, 32, 40, 48, 64],
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64],
  fontWeights: {
    [FontWeight.hairline]: FontWeight.hairline,
    [FontWeight.thin]: FontWeight.thin,
    [FontWeight.light]: FontWeight.light,
    [FontWeight.normal]: FontWeight.normal,
    [FontWeight.medium]: FontWeight.medium,
    [FontWeight.semibold]: FontWeight.semibold,
    [FontWeight.bold]: FontWeight.bold,
    [FontWeight.extrabold]: FontWeight.extrabold,
    [FontWeight.black]: FontWeight.black,
  },
  fonts: {
    heading: `system-ui, Helvetica, Arial, sans-serif`,
    body: `system-ui, Helvetica, Arial, sans-serif`,
    mono: `SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace`,
  },
  variants: {
    container: {
      maxWidth: 1200,
      px: 4,
    },
  },
};

export default baseTheme;
