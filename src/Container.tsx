/** @jsx jsx */
import { jsx } from './jsx';
import { forwardRefWithAs, sxVariant } from './utils';
import { ResponsiveValue } from 'styled-system';

export type ContainerProps = {
  /**
   * The variant key from the theme to use for this element.
   * */
  variant?: ResponsiveValue<string>;
};

export const Container = forwardRefWithAs<ContainerProps, 'div'>(
  ({ as: Element = 'div', variant = 'container', style, ...props }, ref) => (
    <Element
      ref={ref}
      sx={{ mx: 'auto', width: '100%', maxWidth: 'container', variant: sxVariant(variant) }}
      {...props}
    />
  ),
);

Container.displayName = 'Container';
