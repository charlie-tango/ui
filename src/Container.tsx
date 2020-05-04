/** @jsx jsx */
import React, { ElementType } from 'react';
import { jsx } from './jsx';
import { sxVariant, PolymorphicComponent } from './utils';
import { Box, BoxOwnProps, BoxProps } from './Box';

// An HTML tag or a different React component can be rendered by default
const defaultElement = 'div';

export const Container = React.forwardRef(
  <As extends ElementType = typeof defaultElement>(
    { variant = 'container', ...props }: BoxProps<As>,
    ref: React.Ref<any>,
  ) => (
    <Box
      ref={ref}
      // The `as` prop may be overridden by the passed props
      as={defaultElement}
      sx={{ mx: 'auto', width: '100%', maxWidth: 'container', variant: sxVariant(variant) }}
      {...props}
    />
  ),
) as PolymorphicComponent<BoxOwnProps, typeof defaultElement>;

// @ts-ignore
Container.displayName = 'Container';
