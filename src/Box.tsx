import * as React from 'react';
import styled from '@emotion/styled';
import { space, default as StyledSystem } from 'styled-system';
import css, { get, ResponsiveStyleValue, SystemStyleObject } from '@styled-system/css';
import { InterpolationWithTheme } from '@emotion/core';

/**
 * The `SxStyleProp` extension `SystemStyleObject` and `Emotion` [style props](https://emotion.sh/docs/object-styles)
 * such that properties that are part of the `Theme` will be transformed to
 * their corresponding values. Other valid CSS properties are also allowed.
 */
export type SxStyleProp = SystemStyleObject &
  Record<
    string,
    | SystemStyleObject
    | ResponsiveStyleValue<number | string>
    | Record<string, SystemStyleObject | ResponsiveStyleValue<number | string>>
  >;

export interface BaseProps extends React.RefAttributes<any> {
  as?: React.ElementType;
  css?: InterpolationWithTheme<any>;
  /**
   * The sx prop lets you style elements inline, using values from your theme.
   */
  sx?: SxStyleProp;
  /**
   * The variant key from the theme to use for this element.
   * */
  variant?: StyledSystem.ResponsiveValue<string>;
}

interface BoxKnownProps extends BaseProps, StyledSystem.SpaceProps {
  /**
   * @private The __themeKey prop sets the default lookup area for `variant` values. By default it is `variants`.
   */
  __themeKey?: string | undefined;
  /**
   * @private The _css prop is used in libraries to set the base css values using sx
   */
  __css?: SxStyleProp;
}

export interface BoxProps
  extends BoxKnownProps,
    Omit<React.HTMLProps<HTMLDivElement>, keyof BoxKnownProps> {}

interface Props extends BoxProps {
  theme: any;
}

const sx = (props: Props) => css(props.sx)(props.theme);
const base = (props: Props) => css(props.__css)(props.theme);

const variant = ({ theme, variant, __themeKey = 'variants' }: Props) =>
  css(get(theme, __themeKey + '.' + variant, get(theme, variant as string | string[])))(theme);

/**
 * The Box hooks into some of the features from styled-system
 */
export const Box = styled.div<BoxProps>`
  ${base};
  ${sx};
  ${variant};
  ${space};
`;
