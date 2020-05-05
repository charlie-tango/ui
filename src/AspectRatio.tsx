/** @jsx jsx */
import { jsx } from './jsx';
import React, { ElementType, forwardRef } from 'react';
import { PropsOf } from '@emotion/react';
import { ResponsiveValue, system } from 'styled-system';

import { Box, BoxOwnProps, BoxProps } from './Box';
import { PolymorphicComponent, isNumber } from './utils';

interface AspectRatioOwnProps extends BoxOwnProps {
  /**
   * Ratio is the relation between height and width.
   * You calculate it as `width / height`, so to get the the default video aspect ratio you would say:
   * `ratio={16 / 9}`.
   */
  ratio: ResponsiveValue<number>;
}

type AspectRatioProps<E extends ElementType> = BoxOwnProps<E> &
  Omit<PropsOf<E>, keyof AspectRatioOwnProps>;

const defaultElement = 'div';

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

export const AspectRatio = forwardRef(
  <As extends ElementType = typeof defaultElement>(
    { ratio, ...props }: AspectRatioProps<As>,
    ref: React.Ref<any>,
  ) => {
    return (
      <Box
        ref={ref}
        as={defaultElement}
        css={[{ display: 'block', position: 'relative' }, aspectConfig({ ratio })]}
        {...props}
      />
    );
  },
) as PolymorphicComponent<AspectRatioOwnProps>;

// @ts-ignore
AspectRatio.displayName = 'AspectRatio';

export const AspectRatioItem = forwardRef(
  <As extends ElementType = typeof defaultElement>(
    { ratio, ...props }: BoxProps<As>,
    ref: React.Ref<any>,
  ) => {
    return (
      <Box
        ref={ref}
        as={defaultElement}
        css={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
        {...props}
      />
    );
  },
) as PolymorphicComponent<BoxOwnProps, typeof defaultElement>;

// @ts-ignore
AspectRatioItem.displayName = 'AspectRatioItem';
