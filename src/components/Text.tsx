import React, { forwardRef } from 'react';
import { BoxProps } from '../types';
import { Box } from './Box';

export const Text: React.FC<BoxProps> = forwardRef((props, ref) => (
  <Box ref={ref} as="p" tx="text" {...props} />
));
