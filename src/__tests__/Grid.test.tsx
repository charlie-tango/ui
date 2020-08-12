import React from 'react';
import { render } from '@testing-library/react';

import { Grid, GridItem } from '../Grid';

test('render grid', () => {
  render(
    <Grid gridGap={25} gridColumns={[4, 8, 12]}>
      <GridItem size={1}>Item 1</GridItem>
      <GridItem size={1 / 2}>Item 2</GridItem>
    </Grid>,
  );
});
