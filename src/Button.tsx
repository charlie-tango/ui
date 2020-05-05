/** @jsx jsx */
import { jsx } from './jsx';
import React, { ElementType, forwardRef } from 'react';

import { Box, BoxOwnProps, BoxProps } from './Box';
import { PolymorphicComponent, sxVariant } from './utils';

const defaultElement = 'button';

export const Button = forwardRef(
  <As extends ElementType = typeof defaultElement>(
    { variant, ...props }: BoxProps<As>,
    ref: React.Ref<any>,
  ) => {
    return (
      <Box
        ref={ref}
        // The `as` prop may be overridden by the passed props
        as={defaultElement}
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
          m: 0,
          px: 3,
          py: 2,
          variant: sxVariant(variant, 'buttons'),
        }}
        {...props}
      />
    );
  },
) as PolymorphicComponent<BoxOwnProps, typeof defaultElement>;

// @ts-ignore
Button.displayName = 'Button';
