import React, { forwardRef } from 'react';
import { Box, BoxProps } from './Box';

export const Text: React.FC<BoxProps> = forwardRef<HTMLParagraphElement>((props, ref) => (
  <Box ref={ref} as="p" tx="text" __css={{ my: 0 }} {...props} />
));

export const Heading: React.FC<BoxProps> = forwardRef<HTMLHeadingElement>((props, ref) => (
  <Box ref={ref} as="h2" tx="text" variant="heading" __css={{ my: 0 }} {...props} />
));
