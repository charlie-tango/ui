import React from 'react';
import { space, layout, typography, color, flexbox, system, compose } from 'styled-system';
import css, { get, ResponsiveStyleValue, SystemStyleObject } from '@styled-system/css';
import styled from 'styled-components';
import { isNumber } from './utils';
import {
  FlexboxProps,
  ColorProps,
  DisplayProps,
  OverflowProps,
  ResponsiveValue,
  SizeProps,
  SpaceProps,
  TypographyProps,
  VerticalAlignProps,
} from 'styled-system';
import * as CSS from 'csstype';

interface BaseProps extends React.RefAttributes<any> {
  as?: React.ElementType;
}

export type SxStyleProp = SystemStyleObject &
  Record<
    string,
    | SystemStyleObject
    | ResponsiveStyleValue<number | string>
    | Record<string, SystemStyleObject | ResponsiveStyleValue<number | string>>
  >;

interface BoxKnownProps
  extends BaseProps,
    SpaceProps,
    FlexboxProps,
    TypographyProps,
    ColorProps,
    DisplayProps,
    VerticalAlignProps,
    SizeProps,
    OverflowProps {
  /**
   * The sx prop lets you style elements inline, using values from your theme.
   */
  sx?: SxStyleProp;
  /**
   * Use `variant` to apply a set of styles from the theme to a component.
   *
   * See https://styled-system.com/variants for detailed description
   * */
  variant?: ResponsiveValue<string>;
  tx?: string | undefined;
  __css?: SxStyleProp;

  /**
   *   The width utility parses a component's `w` prop and converts it into a CSS width declaration.
   *
   *   - Numbers from 0-1 are converted to percentage widths.
   *   - Numbers greater than 1 are converted to pixel values.
   *   - String values are passed as raw CSS values.
   *   - And arrays are converted to responsive width styles.
   */
  w?: ResponsiveValue<CSS.WidthProperty<string | 0 | number>>;
  minW?: ResponsiveValue<CSS.MinWidthProperty<string | 0 | number>>;
  maxW?: ResponsiveValue<CSS.MaxWidthProperty<string | 0 | number>>;

  /**
   * The height CSS property specifies the height of an element. By default, the property defines the height of the
   * content area. If box-sizing is set to border-box, however, it instead determines the height of the border area.
   *
   * [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/height)
   */
  h?: ResponsiveValue<CSS.HeightProperty<string | 0 | number>>;
  minH?: ResponsiveValue<CSS.MinHeightProperty<string | 0 | number>>;
  maxH?: ResponsiveValue<CSS.MaxHeightProperty<string | 0 | number>>;

  /**
   * The box-shadow CSS property adds shadow effects around an element's frame. You can set multiple effects separated
   * by commas. A box shadow is described by X and Y offsets relative to the element, blur and spread radii and color.
   *
   * [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow)
   */
  shadow?: ResponsiveValue<CSS.BoxShadowProperty | number>;
}

export interface BoxProps<T = HTMLDivElement>
  extends BoxKnownProps,
    Omit<React.HTMLProps<T>, keyof BoxKnownProps> {}

interface Props extends BoxProps {
  theme: any;
}

const sx = (props: Props) => css(props.sx)(props.theme);
const base = (props: Props) => css(props.__css)(props.theme);

// This is the Rebass way of defining a variants lookup area.
// Default to look inside `variants` for Box components, but this can be changed to something else (like "buttons"), if you set the the `tx` value on a `<Box />`.
const variant = ({ theme, variant, tx = 'variants' }: Props) => {
  return css(get(theme, tx + '.' + variant, get(theme, variant as string | string[])))(theme);
};

const extraConfig = system({
  c: {
    property: 'color',
  },
  w: {
    property: 'width',
    scale: 'sizes',
    transform: (n, scale) => {
      return get(scale as any, n, !isNumber(n) || n > 1 ? n : n * 100 + '%');
    },
  },
  minW: {
    property: 'minWidth',
    scale: 'sizes',
  },
  maxW: {
    property: 'maxWidth',
    scale: 'sizes',
  },
  h: {
    property: 'height',
    scale: 'sizes',
  },
  minH: {
    property: 'minHeight',
    scale: 'sizes',
  },
  maxH: {
    property: 'maxHeight',
    scale: 'sizes',
  },
  shadow: {
    property: 'boxShadow',
    scale: 'shadows',
  },
});

/**
 * The Box component allows you to specify CSS props directly on the component
 * Be aware that native HTML props (like width, height) will be not be removed by styled-components.
 * It shouldn't be a problem, but they will be included in the output.
 * */
export const Box: React.FC<BoxProps> = styled.div(
  { boxSizing: 'border-box', margin: 0, minWidth: 0 },
  base,
  variant,
  sx,
  compose(
    space,
    layout,
    typography,
    color,
    flexbox,
    extraConfig,
  ),
);

/**
 * The Flex component is the same as the Box component, but with `display: flex` set as the default.
 * */
export const Flex: React.FC<BoxProps> = styled(Box)({
  display: 'flex',
});
