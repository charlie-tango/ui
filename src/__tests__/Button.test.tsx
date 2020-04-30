import React from 'react';
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
