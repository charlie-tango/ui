/** @jsx jsx */
import { jsx } from './jsx';
import { ComponentPropsWithRef, forwardRef } from 'react';

/**
 * VisuallyHidden renders content hidden for everything but the screen reader.
 * */
export const VisuallyHidden = forwardRef<HTMLSpanElement, ComponentPropsWithRef<'span'>>(
  (props, ref) => (
    <span
      ref={ref}
      css={{
        position: 'absolute',
        height: 1,
        width: 1,
        margin: -1,
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)',
        whiteSpace: 'nowrap',
        wordWrap: 'normal',
      }}
      {...props}
    />
  ),
);

// @ts-ignore
VisuallyHidden.displayName = 'VisuallyHidden';
