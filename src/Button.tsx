/** @jsx jsx */
import { jsx } from './jsx';

import { ElementType, forwardRef } from 'react';
import { Box, BoxOwnProps, BoxProps } from './Box';
import { PolymorphicComponent } from './utils';

const defaultElement = 'button';

export const Button = forwardRef(
  <As extends ElementType = typeof defaultElement>(
    { variant, ref, ...props }: BoxProps<As>,
    innerRef: typeof ref,
  ) => {
    return (
      <Box
        ref={innerRef}
        // The `as` prop may be overridden by the passed props
        as={defaultElement}
        themeKey="buttons"
        variant={variant}
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
        }}
        {...props}
      />
    );
  },
) as PolymorphicComponent<BoxOwnProps, typeof defaultElement>;

// @ts-ignore
Button.displayName = 'Button';
