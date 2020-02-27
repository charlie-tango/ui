import { SystemCssProperties } from '@styled-system/css';

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

declare module 'react' {
  interface DOMAttributes<T> {
    /** Style the element with `@styled-system/css` */
    sx?: SystemCssProperties;
  }
}

declare global {
  namespace JSX {
    interface IntrinsicAttributes {
      /** Style the element with `@styled-system/css` */
      sx?: SystemCssProperties;
    }
  }
}
