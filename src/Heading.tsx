import React, { forwardRef } from 'react';
import { Box, BoxProps } from './Box';

export const Heading: React.FC<BoxProps> = forwardRef<HTMLHeadingElement, BoxProps>(
  (props, ref) => (
    <Box ref={ref} as="h2" themeKey="text" variant="heading" __css={{ my: 0 }} {...props} />
  ),
);
