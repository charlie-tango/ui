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
        m: 0,
        px: 3,
        py: 2,
        background: 'none',
        color: 'currentColor',
        border: 'none',
        borderRadius: 0,
        fontSize: 'inherit',
        fontFamily: 'body',
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
      }}
    />
  );
});
