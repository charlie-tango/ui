/** @jsx jsx */
import { jsx } from './jsx';
import React, { forwardRef } from 'react';

export type BoxProps = React.HTMLProps<HTMLDivElement> & {
  as?: React.ElementType;
  variant?: string;
};

/**
 * @deprecated Instead of consuming the `<Box>`, you should use normal elements like `<div sx={{bg: 'blue'}}>`.
 */
export const Box = forwardRef<HTMLDivElement, BoxProps>(
  ({ as: Comp = 'div', variant, ...props }, ref) => {
    return <Comp ref={ref} sx={{ variant }} {...props} />;
  },
);
