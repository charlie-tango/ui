import { Theme } from 'styled-system';
import typography from './typography';
import { DefaultTheme } from 'styled-components';

export interface PresetTheme extends Theme, DefaultTheme {
  variants: { [key: string]: any };
}

export const baseTheme: PresetTheme = {
  breakpoints: [
    '30em', // 480px - Mobile and above
    '48em', // 768px - Tablets portrait and above
    '62em', // 992px - Tablets landscape and above
    '80em', // 1280px - Desktops up to 13' and above
    '90em', // 1440px - Max width, desktops HD and above
  ],
  space: [
    '0', // 0px
    '0.25rem', // 4px
    '0.5rem', // 8px
    '1rem', // 16px
    '1.25rem', // 20px
    '1.5rem', // 24px
    '2rem', // 32px
    '2.5rem', // 40px
    '3rem', // 48px
    '4rem', // 64px
  ],
  ...typography,
  variants: {
    container: {
      maxWidth: 1200,
      px: 4,
    },
  },
};

export default baseTheme;
