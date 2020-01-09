import { ResponsiveStyleValue, SystemStyleObject } from '@styled-system/css';
import * as React from 'react';
import * as StyledSystem from 'styled-system';
import { InterpolationWithTheme } from '@emotion/core';

export {};

export interface BaseProps extends React.RefAttributes<any> {
  as?: React.ElementType;
  css?: InterpolationWithTheme<any>;
}

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

export interface SxProps {
  /**
   * The sx prop lets you style elements inline, using values from your theme.
   */
  sx?: SxStyleProp;
}

interface BoxKnownProps
  extends BaseProps,
    StyledSystem.SpaceProps,
    StyledSystem.WidthProps,
    StyledSystem.HeightProps,
    StyledSystem.FontSizeProps,
    StyledSystem.ColorProps,
    StyledSystem.FlexProps,
    StyledSystem.OrderProps,
    StyledSystem.AlignSelfProps,
    StyledSystem.LayoutProps,
    SxProps {
  variant?: StyledSystem.ResponsiveValue<string>;
  tx?: string | undefined;
  /**
   * The _css prop is used in libraries to set the base css values using sx
   */
  __css?: SxStyleProp;
}
export interface BoxProps
  extends BoxKnownProps,
    Omit<React.HTMLProps<HTMLDivElement>, keyof BoxKnownProps> {}
export const Box: React.FunctionComponent<BoxProps>;
