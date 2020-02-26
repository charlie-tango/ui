/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { forwardRef } from 'react';
import { ResponsiveValue, system } from 'styled-system';

import { isNumber } from './utils';

type AspectRatioProps = React.HTMLProps<HTMLDivElement> & {
  as: React.ElementType;
  /**
   * Ratio is the relation between height and width.
   * You calculate it as `width / height`, so to get the the default video aspect ratio you would say:
   * `ratio={16 / 9}`.
   */
  ratio: ResponsiveValue<number>;
};

type AspectRatioItemProps = React.HTMLProps<HTMLDivElement> & {
  as: React.ElementType;
};

const aspectConfig = system({
  ratio: {
    property: 'paddingBottom',
    transform: ratio => {
      if (isNumber(ratio)) {
        return 100 / ratio + '%';
      }
      return ratio;
    },
  },
});

export const AspectRatio = forwardRef<HTMLHeadingElement, AspectRatioProps>(
  ({ as: Comp, ratio, ...props }, ref) => {
    return (
      <Comp
        ref={ref}
        css={[{ display: 'block', position: 'relative' }, aspectConfig({ ratio })]}
        {...props}
      />
    );
  },
);

AspectRatio.defaultProps = {
  as: 'div',
};

export const AspectRatioItem = forwardRef<HTMLHeadingElement, AspectRatioItemProps>(
  ({ as: Comp, ...props }, ref) => {
    return (
      <Comp
        ref={ref}
        css={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
        {...props}
      />
    );
  },
);

AspectRatioItem.defaultProps = {
  as: 'div',
};
