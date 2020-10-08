import { ElementType } from 'react';
import { Theme } from '@emotion/react';
import { SystemCssProperties } from '@styled-system/css';
import { ResponsiveValue } from 'styled-system';
import { PolymorphicProps } from './polymorphic';

////////////////////////////////////
// EXPORTED COMPONENTS            //
////////////////////////////////////

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

////////////////////////////////////
// EXPORTED TYPES                 //
////////////////////////////////////

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

export interface ThemeProps<E extends ElementType = ElementType> extends PolymorphicProps<E> {
  /**
   * The variant key from the theme to use for this element.
   * */
  variant?: ResponsiveValue<string>;
  /**
   * The `themeKey` prop sets the default lookup area for `variant` values.
   */
  themeKey?: string;
  sx?: SxProp;
}

////////////////////////////////////
// EXTEND GLOBAL MODULES          //
////////////////////////////////////

declare module 'react' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface DOMAttributes<T> {
    /** Style the element with `@styled-system/css` */
    sx?: SxProp;
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare global {
  namespace JSX {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface IntrinsicAttributes {
      /** Style the element with `@styled-system/css` */
      sx?: SxProp;
    }
  }
}
