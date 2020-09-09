/** @jsx jsx */
import { jsx } from '@charlietango/emotion-sx';
import { forwardRef } from 'react';

import { sxVariant } from './utils';
import { PolymorphicComponent } from './polymorphic';
import { ThemeProps } from './index';

export const Text = forwardRef<HTMLParagraphElement, ThemeProps<'p'>>(
  ({ as: Element = 'p', variant = 'body', themeKey = 'text', ...props }, ref) => (
    <Element ref={ref} sx={{ my: 0, variant: sxVariant(variant, themeKey) }} {...props} />
  ),
) as PolymorphicComponent<ThemeProps, 'p'>;

Text.displayName = 'Text';
