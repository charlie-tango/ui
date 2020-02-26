/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { forwardRef } from 'react';
import { Theme } from '@styled-system/css';
import { ResponsiveValue } from 'styled-system';

import { sx } from './index';
import { cssVariant } from './utils';

export type HeadingProps = React.HTMLProps<HTMLHeadingElement> & {
  as: React.ElementType;
  /**
   * The variant key from the theme to use for this element.
   * */
  variant?: ResponsiveValue<string>;
  /**
   * The `themeKey` prop sets the default lookup area for `variant` values.
   */
  themeKey?: string | undefined;
};

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ themeKey, variant, as: Comp, ...props }, ref) => {
    return (
      <Comp
        ref={ref}
        css={(theme: Theme) => [
          sx({
            my: 0,
          })(theme),
          cssVariant({ themeKey, variant, theme }),
        ]}
        {...props}
      />
    );
  },
);

Heading.defaultProps = {
  themeKey: 'text',
  variant: 'heading',
  as: 'h2',
};
