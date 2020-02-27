/** @jsx jsx */
import { jsx } from './jsx';
import React, { forwardRef } from 'react';

export type BoxProps = React.HTMLProps<HTMLParagraphElement> & {
  as: React.ElementType;
};

/**
 * @deprecated Instead of consuming the `<Box>`, you should use normal elements like `<div sx={{bg: 'blue'}}>`.
 */
export const Box = forwardRef<HTMLParagraphElement, BoxProps>(({ as: Comp, ...props }, ref) => {
  return <Comp ref={ref} {...props} />;
});

Box.defaultProps = {
  as: 'div',
};
