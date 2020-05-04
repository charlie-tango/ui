/** @jsx jsx */
import { jsx } from './jsx';
import React, { ElementType, forwardRef } from 'react';
import { ResponsiveValue } from 'styled-system';
import { PolymorphicComponent, sxVariant } from './utils';
import { PropsOf } from '@emotion/react';
import { SxProp } from './index';

export interface BoxOwnProps<E extends ElementType = ElementType> {
  as?: E;
  /**
   * The variant key from the theme to use for this element.
   * */
  variant?: ResponsiveValue<string>;
  /**
   * The `themeKey` prop sets the default lookup area for `variant` values.
   */
  themeKey?: string;
  sx?: SxProp;
}

export type BoxProps<As extends ElementType> = BoxOwnProps<As> &
  Omit<PropsOf<As>, keyof BoxOwnProps>;

const defaultElement = 'div';

export const Box = forwardRef<HTMLDivElement, BoxOwnProps>(
  ({ as, variant, themeKey, ...restProps }: BoxOwnProps, ref: React.Ref<Element>) => {
    const Element = as || defaultElement;
    console.log(variant);
    return (
      <Element
        ref={ref}
        sx={variant ? { variant: sxVariant(variant, themeKey) } : undefined}
        {...restProps}
      />
    );
  },
) as PolymorphicComponent<BoxOwnProps, typeof defaultElement>;
