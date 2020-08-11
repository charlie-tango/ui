/** @jsx jsx */
import { jsx } from './jsx';
import { forwardRef } from 'react';

import { ThemeProps } from './index';
import { sxVariant } from './utils';
import { PolymorphicComponent } from './polymorphic';

export const Box = forwardRef<HTMLDivElement, ThemeProps<'div'>>(
  ({ as: Element = 'div', variant, themeKey, ...restProps }, ref) => (
    <Element
      ref={ref}
      sx={variant ? { variant: sxVariant(variant, themeKey) } : undefined}
      {...restProps}
    />
  ),
) as PolymorphicComponent<ThemeProps>;

Box.displayName = 'Box';
