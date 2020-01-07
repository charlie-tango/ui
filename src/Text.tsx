import React, { forwardRef } from 'react';
import { Box, BoxProps } from './Box';

export const Text: React.FC<BoxProps> = forwardRef((props, ref) => (
  <Box ref={ref} as="p" tx="text" {...props} />
));
