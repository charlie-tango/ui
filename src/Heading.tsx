import React, { forwardRef } from 'react';
import { Box, BoxProps } from './Box';

export const Heading: React.FC<BoxProps> = forwardRef<HTMLHeadingElement>((props, ref) => (
  <Box ref={ref} as="h2" tx="text" variant="heading" __css={{ my: 0 }} {...props} />
));
