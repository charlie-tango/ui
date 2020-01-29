import React, { forwardRef } from 'react';
import { Box, BoxProps } from './Box';

export const Button: React.FC<BoxProps> = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  BoxProps
>(({ sx, ...props }, ref) => (
  <Box
    ref={ref}
    as="button"
    variant="default"
    {...props}
    themeKey="buttons"
    sx={{
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
      background: 'none',
      border: 'none',
      borderRadius: 0,
      WebkitAppearance: 'none',
      MozAppearance: 'none',
      '&[disabled]': {
        cursor: 'default',
      },
      ...sx,
    }}
  />
));
