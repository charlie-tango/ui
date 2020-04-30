/** @jsx jsx */
import { jsx } from './jsx';

import { forwardRefWithAs, sxVariant } from './utils';
import { ResponsiveValue } from 'styled-system';

export type ButtonProps = {
  /**
   * The variant key from the theme to use for this element.
   * */
  variant?: ResponsiveValue<string>;
};

export const Button = forwardRefWithAs<ButtonProps, 'button'>(
  ({ as: Element = 'button', variant, ...props }, ref) => {
    return (
      <Element
        ref={ref}
        sx={{
          display: 'inline-block',
          background: 'none',
          color: 'currentColor',
          border: 'none',
          borderRadius: 0,
          fontFamily: 'body',
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
          m: 0,
          px: 3,
          py: 2,
          variant: sxVariant(variant, 'buttons'),
        }}
        {...props}
      />
    );
  },
);

Button.displayName = 'Button';
