export * from './AspectRatio';
export * from './Box';
export * from './BaseCss';
export * from './Button';
export * from './Container';
export * from './Dialog';
export * from './Grid';
export * from './Heading';
export * from './Text';
export * from './Portal';
export * from './theme';
export * from './VisuallyHidden';

/**
 * Export the `css` prop as `sx` to avoid confusing it with the `Emotion` css prop.
 * It enables you to hook into the styled-system theme on any component:
 *
 * @example
 * <div css={
 *   sx({
 *     fontSize: 20,
 *     color: 'red',
 *     m: [4, 6]
 *   })}
 * />
 **/

export { default as sx } from '@styled-system/css';
