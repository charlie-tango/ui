/** @jsx jsx */
import { jsx } from '@charlietango/emotion-sx';
import { forwardRef } from 'react';

import { sxVariant } from './utils';
import { ThemeProps } from './index';
import { PolymorphicComponent } from './polymorphic';

export const Button = forwardRef<HTMLButtonElement, ThemeProps<'button'>>(
  ({ as: Element = 'button', variant, themeKey = 'buttons', ...props }, ref) => {
    return (
      <Element
        ref={ref}
        sx={{
          appearance: 'none',
          background: 'none',
          border: 'none',
          borderRadius: 0,
          cursor: 'pointer',
          color: 'currentColor',
          display: 'inline-block',
          fontFamily: 'body',
          fontSize: 'inherit',
          lineHeight: 'inherit',
          textAlign: 'center',
          textDecoration: 'none',
          textTransform: 'none',
          userSelect: 'none',
          m: 0,
          px: 3,
          py: 2,
          variant: sxVariant(variant, themeKey),
        }}
        {...props}
      />
    );
  },
) as PolymorphicComponent<ThemeProps, 'button'>;

Button.displayName = 'Button';
