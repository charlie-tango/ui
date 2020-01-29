import React, { forwardRef } from 'react';
import { Box, BoxProps } from './Box';

export const Heading: React.FC<BoxProps> = forwardRef<HTMLHeadingElement, BoxProps>(
  ({ sx, ...props }, ref) => (
    <Box ref={ref} as="h2" themeKey="text" variant="heading" sx={{ my: 0, ...sx }} {...props} />
  ),
);
