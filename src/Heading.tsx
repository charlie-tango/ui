/** @jsx jsx */
import { jsx } from './jsx';

import { forwardRefWithAs, sxVariant } from './utils';
import { ResponsiveValue } from 'styled-system';

type HeadingProps = {
  /**
   * The variant key from the theme to use for this element.
   * */
  variant?: ResponsiveValue<string>;
};

export const Heading = forwardRefWithAs<HeadingProps, 'h2'>(
  ({ as: Element = 'h2', variant = 'heading', ...props }, ref) => {
    return <Element ref={ref} sx={{ my: 0, variant: sxVariant(variant, 'text') }} {...props} />;
  },
);
