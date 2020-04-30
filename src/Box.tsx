/** @jsx jsx */
import { jsx } from './jsx';
import { ResponsiveValue } from 'styled-system';
import { forwardRefWithAs, sxVariant } from './utils';

export type BoxProps = {
  /**
   * The variant key from the theme to use for this element.
   * */
  variant?: ResponsiveValue<string>;
  /**
   * The `themeKey` prop sets the default lookup area for `variant` values.
   */
  themeKey?: string;
};

export const Box = forwardRefWithAs<BoxProps, 'div'>(
  ({ as: Element = 'div', variant, themeKey, ...props }, ref) => {
    return <Element ref={ref} sx={{ variant: sxVariant(variant, themeKey) }} {...props} />;
  },
);

Box.displayName = 'Box';
