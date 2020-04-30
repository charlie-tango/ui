/** @jsx jsx */
import { jsx } from './jsx';
import { ResponsiveValue, system } from 'styled-system';

import { forwardRefWithAs, isNumber } from './utils';

type AspectRatioProps = {
  /**
   * Ratio is the relation between height and width.
   * You calculate it as `width / height`, so to get the the default video aspect ratio you would say:
   * `ratio={16 / 9}`.
   */
  ratio: ResponsiveValue<number>;
};

type AspectRatioItemProps = {};

const aspectConfig = system({
  ratio: {
    property: 'paddingBottom',
    transform: (ratio) => {
      if (isNumber(ratio)) {
        return 100 / ratio + '%';
      }
      return ratio;
    },
  },
});

export const AspectRatio = forwardRefWithAs<AspectRatioProps, 'div'>(
  ({ as: Element = 'div', ratio, ...props }, ref) => {
    return (
      <Element
        ref={ref}
        css={[{ display: 'block', position: 'relative' }, aspectConfig({ ratio })]}
        {...props}
      />
    );
  },
);

AspectRatio.displayName = 'AspectRatio';

export const AspectRatioItem = forwardRefWithAs<AspectRatioItemProps, 'div'>(
  ({ as: Element = 'div', ...props }, ref) => {
    return (
      <Element
        ref={ref}
        css={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
        {...props}
      />
    );
  },
);

AspectRatioItem.displayName = 'AspectRatioItem';
