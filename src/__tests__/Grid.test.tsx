import { render } from '@testing-library/react';
import React from 'react';
import { Grid, GridItem } from '../Grid';

test('render grid', () => {
  render(
    <Grid gridGap={16}>
      <GridItem col={8}>Item 1</GridItem>
      <GridItem col={4}>Item 2</GridItem>
    </Grid>,
  );
});
