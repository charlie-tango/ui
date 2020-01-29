import React, { forwardRef } from 'react';
import { Box, BoxProps } from './Box';

export const Text: React.FC<BoxProps> = forwardRef<HTMLParagraphElement, BoxProps>(
  ({ sx, ...props }, ref) => (
    <Box ref={ref} as="p" themeKey="text" variant="body" sx={{ my: 0, ...sx }} {...props} />
  ),
);
