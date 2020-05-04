/** @jsx jsx */
import { jsx } from './jsx';

import React, { ElementType, forwardRef } from 'react';
import { PolymorphicComponent, sxVariant } from './utils';
import { Box, BoxOwnProps, BoxProps } from './Box';

const defaultElement = 'p';

export const Text = forwardRef(
  <As extends ElementType = typeof defaultElement>(
    { variant = 'body', ...props }: BoxProps<As>,
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
Text.displayName = 'Text';
