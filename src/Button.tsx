import React, { forwardRef } from 'react';
import { Box, BoxProps } from './Box';

export const Button: React.FC<BoxProps> = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  BoxProps
>((props, ref) => {
  return (
    <Box
      ref={ref}
      as="button"
      variant="primary"
      {...props}
      themeKey="buttons"
      __css={{
        display: 'inline-block',
        userSelect: 'none',
        color: 'currentColor',
        lineHeight: 'inherit',
        fontSize: 'inherit',
        fontFamily: 'body',
        textAlign: 'center',
        textTransform: 'none',
        textDecoration: 'none',
        cursor: 'pointer',
        background: 'none',
        border: 'none',
        borderRadius: 0,
        m: 0,
        px: 3,
        py: 2,
        appearance: 'none',
        '&[disabled]': {
          cursor: 'default',
        },
      }}
    />
  );
});
