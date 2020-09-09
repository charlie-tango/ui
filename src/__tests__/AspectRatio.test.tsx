import React from 'react';
import { render } from '@testing-library/react';
import { AspectRatio, AspectRatioItem } from '../AspectRatio';

test('render Aspect Ratio', () => {
  render(
    <AspectRatio ratio={16 / 9}>
      <AspectRatioItem>Inner</AspectRatioItem>
    </AspectRatio>,
  );
});
