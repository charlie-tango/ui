import React, { useRef } from 'react';
import { render } from '@testing-library/react';

import { Button } from '../Button';

test('render basic button with HTML attributes', () => {
  render(
    <Button aria-hidden onClick={() => {}}>
      Inner
    </Button>,
  );
});

test('render button as anchor with HTML attributes', () => {
  render(
    <Button as="a" href="/link">
      Link
    </Button>,
  );
});

test('render button with ref', () => {
  const RefComponent = () => {
    const ref = useRef(null);
    return <Button ref={ref}>Button</Button>;
  };

  render(<RefComponent />);
});
