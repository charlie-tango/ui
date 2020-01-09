import styled from '@emotion/styled';
import { Box } from './Box';
import { ResponsiveValue, system } from 'styled-system';
import { isNumber } from './utils';

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

export const AspectRatio = styled(Box)<AspectRatioProps>(
  {
    display: 'block',
    position: 'relative',
  },
  aspectConfig,
);

export const AspectRatioItem = styled(Box)({
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
});
