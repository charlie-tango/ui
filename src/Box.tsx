/** @jsx jsx */
import { jsx } from '@charlietango/emotion-sx';
import { forwardRef } from 'react';

import { ThemeProps } from './index';
import { sxVariant } from './utils';
import { PolymorphicComponent } from './polymorphic';

/**
 * Basic Box component that allow you to hook into the Theme
 */
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
