/** @jsx jsx */
import { jsx } from './jsx';
import { ElementType, forwardRef } from 'react';
import { ResponsiveValue, system } from 'styled-system';

import { PolymorphicProps, PolymorphicComponent } from './polymorphic';
import { isNumber } from './utils';

interface AspectRatioProps<E extends ElementType = ElementType> extends PolymorphicProps<E> {
  /**
   * Ratio is the relation between height and width.
   * You calculate it as `width / height`, so to get the the default video aspect ratio you would say:
   * `ratio={16 / 9}`.
   */
  ratio: ResponsiveValue<number>;
}

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

export const AspectRatio = forwardRef<HTMLDivElement, AspectRatioProps<'div'>>(
  ({ as: Element = 'div', ratio, ...props }, ref) => {
    return (
      <Element
        ref={ref}
        css={[{ display: 'block', position: 'relative' }, aspectConfig({ ratio })]}
        {...props}
      />
    );
  },
) as PolymorphicComponent<AspectRatioProps>;

AspectRatio.displayName = 'AspectRatio';

export const AspectRatioItem = forwardRef<HTMLDivElement, PolymorphicProps<'div'>>(
  ({ as: Element = 'div', ...props }, ref) => {
    return (
      <Element
        ref={ref}
        css={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
        {...props}
      />
    );
  },
) as PolymorphicComponent<PolymorphicProps>;

AspectRatioItem.displayName = 'AspectRatioItem';
