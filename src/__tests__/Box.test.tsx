import { render } from '@testing-library/react';
import React from 'react';
import { Box } from '../Box';

test('render box with HTML attributes', () => {
  render(
    <Box aria-hidden onClick={() => {}}>
      Inner
    </Box>,
  );
});
