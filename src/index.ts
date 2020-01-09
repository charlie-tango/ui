export * from './AspectRatio';
export * from './Box';
export * from './Container';
export * from './Grid';
export * from './Text';
export * from './theme';

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
