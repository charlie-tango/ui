/** @jsx jsx */
import { jsx } from './jsx';
import React, { ElementType, forwardRef } from 'react';

import { Box, BoxOwnProps, BoxProps } from './Box';
import { PolymorphicComponent, sxVariant } from './utils';

const defaultElement = 'h2';

export const Heading = forwardRef(
  <As extends ElementType = typeof defaultElement>(
    { variant = 'heading', ...props }: BoxProps<As>,
    ref: React.Ref<any>,
  ) => {
    return (
      <Box
        as={defaultElement}
        ref={ref}
        sx={{ my: 0, variant: sxVariant(variant, 'text') }}
        {...props}
      />
    );
  },
) as PolymorphicComponent<BoxOwnProps, typeof defaultElement>;

// @ts-ignore
Heading.displayName = 'Heading';
