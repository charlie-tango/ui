/** @jsx jsx */
import { jsx } from './jsx';

import { forwardRefWithAs, sxVariant } from './utils';
import { ResponsiveValue } from 'styled-system';

export type TextProps = {
  variant?: ResponsiveValue<string>;
};

export const Text = forwardRefWithAs<TextProps, 'p'>(
  ({ as: Element = 'p', variant = 'body', ...props }, ref) => (
    <Element ref={ref} sx={{ my: 0, variant: sxVariant(variant, 'text') }} {...props} />
  ),
);
