/** @jsx jsx */
import { jsx } from './jsx';
import { forwardRef } from 'react';

import { sxVariant } from './utils';
import { PolymorphicComponent } from './polymorphic';
import { ThemeProps } from './index';

export const Heading = forwardRef<HTMLHeadingElement, ThemeProps<'h2'>>(
  ({ as: Element = 'h2', variant = 'heading', themeKey = 'text', ...props }, ref) => (
    <Element ref={ref} sx={{ my: 0, variant: sxVariant(variant, themeKey) }} {...props} />
  ),
) as PolymorphicComponent<ThemeProps, 'h2'>;

Heading.displayName = 'Heading';
