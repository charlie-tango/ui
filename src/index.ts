import { Theme } from '@emotion/react';
import { SystemCssProperties } from '@styled-system/css';
import { ResponsiveValue } from 'styled-system';

export * from './AspectRatio';
export * from './Box';
export * from './BaseCss';
export * from './Button';
export * from './Container';
export * from './Dialog';
export * from './Grid';
export * from './Heading';
export * from './jsx';
export * from './Text';
export * from './Portal';
export * from './theme';
export * from './VisuallyHidden';

/**
 * @deprecated
 * Export the `css` prop as `sx` to avoid confusing it with the `Emotion` css prop.
 * It enables you to hook into the styled-system theme on any component:
 **/
export { default as sx } from '@styled-system/css';

export type VariantProperty = {
  variant: ResponsiveValue<string>;
};

export type CSSSelectorObject = {
  [cssSelector: string]: SxProp;
};

export type ThemeFunction = {
  (theme: Theme): SxProp;
};

export type SxProp = SystemCssProperties | ThemeFunction | CSSSelectorObject | VariantProperty;

declare module 'react' {
  interface DOMAttributes<T> {
    /** Style the element with `@styled-system/css` */
    sx?: SxProp;
  }
}

declare global {
  namespace JSX {
    interface IntrinsicAttributes {
      /** Style the element with `@styled-system/css` */
      sx?: SxProp;
    }
  }
}
