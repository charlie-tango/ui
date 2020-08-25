/** @jsx jsx */
import { jsx } from '@charlietango/emotion-sx';
import { forwardRef } from 'react';

import { sxVariant } from './utils';
import { ThemeProps } from './index';
import { PolymorphicComponent } from './polymorphic';

/**
 * The `<Container />` component is used to limit the maximum width of your content, while keeping it
 * centered on the page.
 */
export const Container = forwardRef<HTMLDivElement, ThemeProps<'div'>>(
  ({ as: Element = 'div', variant = 'container', themeKey, ...props }, ref) => (
    <Element
      ref={ref}
      sx={{
        mx: 'auto',
        width: '100%',
        maxWidth: 'container',
        variant: sxVariant(variant, themeKey),
      }}
      {...props}
    />
  ),
) as PolymorphicComponent<ThemeProps>;

Container.displayName = 'Container';
