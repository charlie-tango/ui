import styled from '@emotion/styled';
import { Box, BoxProps } from './Box';
import { ResponsiveValue, system } from 'styled-system';
import { isNumber } from './utils';
import React from 'react';

interface AspectRatioProps {
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
    transform: ratio => {
      if (isNumber(ratio)) {
        return 100 / ratio + '%';
      }
      return ratio;
    },
  },
});

export const AspectRatio: React.FC<AspectRatioProps & BoxProps> = styled(Box)<
  AspectRatioProps & BoxProps
>(
  {
    display: 'block',
    position: 'relative',
  },
  aspectConfig,
);

export const AspectRatioItem: React.FC<BoxProps> = styled(Box)<BoxProps>({
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
});
