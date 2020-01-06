import { render } from '@testing-library/react';
import React from 'react';
import { Grid, GridItem } from '../Grid';

test('render grid', () => {
  render(
    <Grid gridGap={16}>
      <GridItem>Item 1</GridItem>
      <GridItem>Item 2</GridItem>
    </Grid>,
  );
});
