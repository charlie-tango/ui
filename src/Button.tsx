/** @jsx jsx */
import { jsx } from './jsx';
import React, { forwardRef } from 'react';
import { Theme } from '@styled-system/css';
import { ResponsiveValue } from 'styled-system';

import { cssVariant } from './utils';

export type ButtonProps = React.HTMLProps<HTMLButtonElement | HTMLAnchorElement> & {
  as: React.ElementType;
  /**
   * The variant key from the theme to use for this element.
   * */
  variant?: ResponsiveValue<string>;
  /**
   * The `themeKey` prop sets the default lookup area for `variant` values. By default it is `buttons`.
   */
  themeKey?: string | undefined;
};

const baseStyle = {
  display: 'inline-block',
  background: 'none',
  color: 'currentColor',
  border: 'none',
  borderRadius: 0,
  fontSize: 'inherit',
  lineHeight: 'inherit',
  textAlign: 'center',
  textTransform: 'none',
  textDecoration: 'none',
  cursor: 'pointer',
  userSelect: 'none',
  appearance: 'none',
  '&[disabled]': {
    cursor: 'default',
  },
};

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ themeKey, variant, as: Comp, ...props }, ref) => {
    return (
      <Comp
        ref={ref}
        sx={{
          m: 0,
          px: 3,
          py: 2,
          fontFamily: 'body',
        }}
        css={(theme: Theme) => [baseStyle, cssVariant({ themeKey, variant, theme })]}
        {...props}
      />
    );
  },
);

Button.defaultProps = {
  themeKey: 'buttons',
  variant: 'primary',
  as: 'button',
};
