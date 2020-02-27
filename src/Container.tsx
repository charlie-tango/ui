/** @jsx jsx */
import { jsx } from './jsx';
import React, { forwardRef } from 'react';
import { Theme } from '@styled-system/css';
import { ResponsiveValue } from 'styled-system';

import { cssVariant } from './utils';

export type ContainerProps = React.HTMLProps<HTMLDivElement> & {
  as: React.ElementType;
  /**
   * The variant key from the theme to use for this element.
   * */
  variant?: ResponsiveValue<string>;
  /**
   * The `themeKey` prop sets the default lookup area for `variant` values.
   */
  themeKey?: string | undefined;
};

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ themeKey, variant, as: Comp, ...props }, ref) => {
    return (
      <Comp
        ref={ref}
        sx={{ mx: 'auto', width: '100%', maxWidth: 'container' }}
        css={(theme: Theme) => [cssVariant({ themeKey, variant, theme })]}
        {...props}
      />
    );
  },
);

Container.defaultProps = {
  themeKey: 'layout',
  variant: 'container',
  as: 'div',
};
