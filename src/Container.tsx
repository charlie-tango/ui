import React, { forwardRef } from 'react';
import { Box, BoxProps } from './Box';

/**
 * Container is a wrapper that restricts the maxWidth of it's content, and ensures that it is centered on the screen
 */
export const Container: React.FC<BoxProps> = forwardRef<HTMLDivElement, BoxProps>((props, ref) => {
  return <Box ref={ref} variant="container" __css={{ mx: 'auto' }} {...props} />;
});
