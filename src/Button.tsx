import React, { forwardRef } from 'react';
import { Box, BoxProps } from './Box';

export const Button: React.FC<BoxProps> = forwardRef<HTMLButtonElement | HTMLAnchorElement>(
  (props, ref) => (
    <Box
      ref={ref}
      as="button"
      variant="default"
      {...props}
      __themeKey="buttons"
      __css={{
        display: 'inline-block',
        m: 0,
        p: 0,
        userSelect: 'none',
        color: 'currentColor',
        fontSize: '1rem',
        fontFamily: 'body',
        textAlign: 'center',
        textTransform: 'none',
        textDecoration: 'none',
        cursor: 'pointer',
        border: 'none',
        background: 'none',
        borderRadius: 0,
        WebkitAppearance: 'none',
        MozAppearance: 'none',
        '&[disabled]': {
          cursor: 'default',
        },
      }}
    />
  ),
);
