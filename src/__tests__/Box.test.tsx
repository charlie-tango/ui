import React from 'react';
import { render } from '@testing-library/react';

import { Box } from '../Box';

const RefBox = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  return <Box ref={ref}>Box with ref</Box>;
};

test('render box with HTML attributes', () => {
  render(
    <Box aria-hidden onClick={() => {}}>
      Inner
    </Box>,
  );
});

test('render box with Ref object', () => {
  render(<RefBox />);
});
