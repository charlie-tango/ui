/** @jsx jsx */
import { jsx } from './jsx';
import React, { forwardRef } from 'react';
import { Theme } from '@styled-system/css';
import { ResponsiveValue } from 'styled-system';

import { cssVariant } from './utils';

export type TextProps = React.HTMLProps<HTMLParagraphElement> & {
  as: React.ElementType<any>;
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
          {
            marginTop: 0,
            marginBottom: 0,
          },
          cssVariant({ themeKey, variant, theme }),
        ]}
        {...props}
      />
    );
  },
);

Text.defaultProps = {
  themeKey: 'text',
  variant: 'body',
  as: 'p',
};
