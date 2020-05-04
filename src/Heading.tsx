/** @jsx jsx */
import { jsx } from './jsx';

import React, { ElementType, forwardRef } from 'react';
import { PolymorphicComponent, sxVariant } from './utils';
import { Box, BoxOwnProps, BoxProps } from './Box';

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
