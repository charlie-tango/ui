/** @jsx jsx */
import { jsx } from './jsx';

import { ElementType, forwardRef } from 'react';
import { PolymorphicComponent, sxVariant } from './utils';
import { Box, BoxOwnProps, BoxProps } from './Box';

const defaultElement = 'h2';

export const Heading = forwardRef(
  <As extends ElementType = typeof defaultElement>(
    { variant = 'heading', ref, ...props }: BoxProps<As>,
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
