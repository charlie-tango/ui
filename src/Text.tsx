/** @jsx jsx */
import { jsx } from './jsx';

import { ElementType, forwardRef } from 'react';
import { PolymorphicComponent, sxVariant } from './utils';
import { Box, BoxOwnProps, BoxProps } from './Box';

const defaultElement = 'p';

export const Text = forwardRef(
  <As extends ElementType = typeof defaultElement>(
    { variant = 'body', ref, ...props }: BoxProps<As>,
    innerRef: typeof ref,
  ) => {
    return (
      <Box
        as={defaultElement}
        ref={innerRef}
        sx={{ my: 0, variant: sxVariant(variant, 'text') }}
        {...props}
      />
    );
  },
) as PolymorphicComponent<BoxOwnProps, typeof defaultElement>;
