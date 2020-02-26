/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { forwardRef } from 'react';
import { Theme } from '@styled-system/css';
import { ResponsiveValue } from 'styled-system';

import { sx } from './index';
import { cssVariant } from './utils';

export type TextProps = React.HTMLProps<HTMLParagraphElement> & {
  as: React.ElementType;
  /**
   * The variant key from the theme to use for this element.
   * */
  variant?: ResponsiveValue<string>;
  /**
   * The `themeKey` prop sets the default lookup area for `variant` values. By default it is `text`.
   */
  themeKey?: string | undefined;
};

export const Text = forwardRef<HTMLParagraphElement, TextProps>(
  ({ themeKey, variant, as: Comp, ...props }, ref) => {
    return (
      <Comp
        ref={ref}
        css={(theme: Theme) => [
          sx({
            my: 0,
          })(theme),
          cssVariant({ themeKey: 'text', variant, theme }),
        ]}
        {...props}
      />
    );
  },
);

Text.defaultProps = {
  variant: 'body',
  as: 'p',
};
