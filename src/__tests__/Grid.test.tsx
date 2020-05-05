import React from 'react';
import { render } from '@testing-library/react';

import { Grid, GridItem } from '../Grid';

test('render grid', () => {
  render(
    <Grid gridGap={25} gridColumns={[8, null, undefined, 12]}>
      <GridItem col={8}>Item 1</GridItem>
      <GridItem col={4}>Item 2</GridItem>
    </Grid>,
  );
});
