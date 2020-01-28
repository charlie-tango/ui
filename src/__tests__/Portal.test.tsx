import { render, screen } from '@testing-library/react';
import React from 'react';
import { Portal } from '../Portal';

test('render a portal', () => {
  const { unmount, baseElement } = render(
    <>
      <p>Inner content</p>
      <Portal>Portal content</Portal>
    </>,
  );

  // Validate that the portal was correctly added to the DOM
  screen.getByText('Portal content');
  expect(baseElement.childElementCount).toBe(2);

  unmount();
  expect(baseElement.childElementCount).toBe(1);
  // Should not find the data-portal after unmount
  expect(baseElement.querySelector('[data-portal]')).toBe(null);
});

test('render a portal with id', () => {
  render(<Portal id="modal">Portal content</Portal>);

  const element = screen.getByText('Portal content');
  expect(element.getAttribute('data-portal')).toBe('modal');
});
